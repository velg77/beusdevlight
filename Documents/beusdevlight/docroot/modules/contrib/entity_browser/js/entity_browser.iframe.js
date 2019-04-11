/**
 * @file entity_browser.iframe.js
 *
 * Defines the behavior of the entity browser's iFrame display.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Registers behaviours related to iFrame display.
   */
  Drupal.behaviors.entityBrowserIFrame = {
    attach: function (context) {
      $(context).find('.entity-browser-handle.entity-browser-iframe').once('iframe-click').on('click', Drupal.entityBrowserIFrame.linkClick);
      $(context).find('.entity-browser-handle.entity-browser-iframe').once('iframe-auto-open').each(function () {
        var uuid = $(this).attr('data-uuid');
        if (drupalSettings.entity_browser.iframe[uuid].auto_open) {
          $(this).click();
        }
      });
    }
  };

  Drupal.entityBrowserIFrame = {};

  /**
   * Handles click on "Select entities" link.
   */
  Drupal.entityBrowserIFrame.linkClick = function () {
    var uuid = $(this).attr('data-uuid');
    var original_path = $(this).attr('data-original-path');
    var iframeSettings = drupalSettings['entity_browser']['iframe'][uuid];
    var autoAdjustHeight = (iframeSettings.height == 0);
    var scrolling = (autoAdjustHeight) ? 'no' : 'auto';
    var iframe = $(
      '<iframe />',
      {
        'src': iframeSettings['src'],
        'width': '100%',
        'height': iframeSettings['height'],
        'data-uuid': uuid,
        'data-original-path': original_path,
        'name': 'entity_browser_iframe_' + iframeSettings['entity_browser_id'],
        'id': 'entity_browser_iframe_' + iframeSettings['entity_browser_id'],
        'scrolling': scrolling
      }
    );

    var throbber = $('<div class="ajax-progress-fullscreen"></div>');
    $(this).parent().css('width', iframeSettings['width']);

    // Register callbacks.
    if (drupalSettings.entity_browser.iframe[uuid].js_callbacks || false) {
      Drupal.entityBrowser.registerJsCallbacks(this, drupalSettings.entity_browser.iframe[uuid].js_callbacks, 'entities-selected');
    }

    // If iframe height set to auto adjust, register callback to do that when
    // the contents finish loading.
    if (autoAdjustHeight) {
      iframe.once('iframe-auto-height').on('load', function () {
        Drupal.entityBrowserIFrame.setIframeHeight(iframe[0]);
        var obsConfig = { childList: true, characterData: true, attributes: true, subtree: true };
        var iframeObserver = new MutationObserver (mutationHandler);
        iframeObserver.observe(iframe[0].contentDocument.body, obsConfig);
        function mutationHandler () {
          Drupal.entityBrowserIFrame.setIframeHeight(iframe[0]);
        }
      });
    }

    $(this).parent().append(throbber).append(iframe).trigger('entityBrowserIFrameAppend');
    $(this).hide();
  };

  /**
   * Resizes iFrame element based on its contents.
   *
   * @param {object} element
   *   iFrame element.
   */
  Drupal.entityBrowserIFrame.setIframeHeight = function (element) {
    element.style.height = '0px';
    var document = element.contentDocument,
      body = document.body,
      html = document.documentElement,
      height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    element.style.height = height + 'px';
    // For entity embed dialog we need to trigger a resize event
    // to adjust the position of the modal.
    $('.entity-select-dialog').trigger('resize');
  }

}(jQuery, Drupal, drupalSettings));
