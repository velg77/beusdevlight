<?php

/**
 * @file
 */

namespace Drupal\tablefield\Element;

use Drupal\Core\Render\Element\FormElement;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\NestedArray;

/**
 * Provides a form element for tabular data.
 *
 * @FormElement("tablefield")
 */
class Tablefield extends FormElement {

  /**
   * {@inheritdoc}
   */
  public function getInfo() {
    $class = get_class($this);
    return [
      '#input' => TRUE,
      '#cols' => 5,
      '#rows' => 5,
      '#lock' => FALSE,
      '#locked_cells' => [],
      '#input_type' => 'textfield',
      '#rebuild' => FALSE,
      '#import' => FALSE,
      '#process' => [
        [$class, 'processTablefield'],
      ],
      '#theme_wrappers' => ['form_element'],
    ];
  }

  /**
   * Processes a checkboxes form element.
   */
  public static function processTablefield(&$element, FormStateInterface $form_state, &$complete_form) {
    $value = is_array($element['#value']) ? $element['#value'] : [];

    // Check if the input_type is one of the allowed types.
    $input_type = in_array($element['#input_type'], ['textarea', 'textfield']) ? $element['#input_type'] : 'textfield';

    // String to uniquely identify DOM elements.
    $id = implode('-', $element['#parents']);

    // This is being set in rebuild and import ajax calls.
    $storage = NestedArray::getValue($form_state->getStorage(), $element['#parents']);
    if ($storage) {
      $element['#cols'] = $storage['tablefield']['rebuild']['cols'];
      $element['#rows'] = $storage['tablefield']['rebuild']['rows'];
    }

    $element['#tree'] = TRUE;

    $element['tablefield'] = [
      '#type' => 'fieldset',
      '#attributes' => ['class' => ['form-tablefield']],
      '#prefix' => '<div id="tablefield-' . $id . '-wrapper">',
      '#suffix' => '</div>',
    ];

    $element['tablefield']['table'] = [
      '#type' => 'table',
    ];

    $rows = isset($element['#rows']) ? $element['#rows'] : \Drupal::config('tablefield.settings')->get('rows');
    $cols = isset($element['#cols']) ? $element['#cols'] : \Drupal::config('tablefield.settings')->get('cols');

    for ($i = 0; $i < $rows; $i++) {
      for ($ii = 0; $ii < $cols; $ii++) {
        if (!empty($element['#locked_cells'][$i][$ii]) && !empty($element['#lock'])) {
          $element['tablefield']['table'][$i][$ii] = [
            '#type' => 'item',
            '#value' => $element['#locked_cells'][$i][$ii],
            '#title' => $element['#locked_cells'][$i][$ii],
          ];
        }
        else {
          $cell_value = isset($value[$i][$ii]) ? $value[$i][$ii] : '';
          $element['tablefield']['table'][$i][$ii] = [
            '#type' => $input_type,
            '#maxlength' => 2048,
            '#size' => 0,
            '#attributes' => [
              'class' => ['tablefield-row-' . $i, 'tablefield-col-' . $ii],
              'style' => 'width:100%',
            ],
            '#default_value' => $cell_value,
          ];
        }
      }
    }

    // If no rebuild, we pass along the rows/cols as a value.
    // Otherwise, we will provide form elements to specify the size and ajax rebuild.
    if (empty($element['#rebuild'])) {
      $element['tablefield']['rebuild'] = [
        '#type' => 'value',
        'cols' => [
          '#type' => 'value',
          '#value' => $cols,
        ],
        'rows' => [
          '#type' => 'value',
          '#value' => $rows,
        ],
      ];
    }
    else {
      $element['tablefield']['rebuild'] = [
        '#type' => 'details',
        '#title' => t('Change number of rows/columns.'),
        '#open' => FALSE,
      ];
      $element['tablefield']['rebuild']['cols'] = [
        '#title' => t('How many Columns'),
        '#type' => 'textfield',
        '#size' => 5,
        '#default_value' => $cols,
      ];
      $element['tablefield']['rebuild']['rows'] = [
        '#title' => t('How many Rows'),
        '#type' => 'textfield',
        '#size' => 5,
        '#default_value' => $rows,
      ];
      $element['tablefield']['rebuild']['rebuild'] = [
        '#type' => 'submit',
        '#value' => t('Rebuild Table'),
        '#name' => 'tablefield-rebuild-' . $id,
        '#attributes' => [
          'class' => ['tablefield-rebuild'],
        ],
        '#submit' => [[get_called_class(), 'submitCallbackRebuild']],
        '#ajax' => [
          'callback' => 'Drupal\tablefield\Element\Tablefield::ajaxCallbackRebuild',
          'progress' => ['type' => 'throbber', 'message' => NULL],
          'wrapper' => 'tablefield-' . $id . '-wrapper',
          'effect' => 'fade',
        ],
      ];
    }

    // Allow import of a csv file.
    if (!empty($element['#import'])) {
      $element['tablefield']['import'] = [
        '#type' => 'details',
        '#title' => t('Import from CSV'),
        '#open' => FALSE,
      ];
      $element['tablefield']['import']['csv'] = [
        '#name' => 'files[' . $id . ']',
        '#title' => 'File upload',
        '#type' => 'file',
      ];

      $element['tablefield']['import']['import'] = [
        '#type' => 'submit',
        '#value' => t('Upload CSV'),
        '#name' => 'tablefield-import-' . $id,
        '#attributes' => [
          'class' => ['tablefield-rebuild'],
        ],
        '#submit' => [[get_called_class(), 'submitCallbackRebuild']],
        '#ajax' => [
          'callback' => 'Drupal\tablefield\Element\Tablefield::ajaxCallbackRebuild',
          'progress' => ['type' => 'throbber', 'message' => NULL],
          'wrapper' => 'tablefield-' . $id . '-wrapper',
          'effect' => 'fade',
        ],
      ];
    }
    return $element;
  }

  /**
   * AJAX callback to rebuild the number of rows/columns.
   * The basic idea is to descend down the list of #parent elements of the
   * triggering_element in order to locate the tablefield inside of the $form
   * array. That is the element that we need to return.
   *
   * @param array $form
   * @param FormStateInterface $form_state
   */
  public static function ajaxCallbackRebuild(array $form, FormStateInterface $form_state) {
    $triggering_element = $form_state->getTriggeringElement();

    // Go as deep as 'tablefield' key, but stop there (two more keys follow).
    $parents = array_slice($triggering_element['#array_parents'], 0, -2, TRUE);
    $rebuild = NestedArray::getValue($form, $parents);

    // We don't want to re-send the format/_weight options.
    unset($rebuild['format']);
    unset($rebuild['_weight']);

    return $rebuild;
  }

  /**
   *
   */
  public static function submitCallbackRebuild(array $form, FormStateInterface $form_state) {
    // Check what triggered this
    // we might need to rebuild or to import.
    $triggering_element = $form_state->getTriggeringElement();

    $id = implode('-', array_slice($triggering_element['#parents'], 0, -3, TRUE));
    $parents = array_slice($triggering_element['#parents'], 0, -2, TRUE);
    $value = $form_state->getValue($parents);

    if (isset($triggering_element['#name']) && $triggering_element['#name'] == 'tablefield-rebuild-' . $id) {
      $parents[] = 'rebuild';
      NestedArray::setValue($form_state->getStorage(), $parents, $value['rebuild']);

      drupal_set_message(t('Table structure rebuilt.'), 'status', FALSE);
    }
    elseif (isset($triggering_element['#name']) && $triggering_element['#name'] == 'tablefield-import-' . $id) {
      // Import CSV.
      $imported_tablefield = static::importCsv($id);

      if ($imported_tablefield) {
        $form_state->setValue($parents, $imported_tablefield);

        $input = $form_state->getUserInput();
        NestedArray::setValue($input, $parents, $imported_tablefield);
        $form_state->setUserInput($input);

        $parents[] = 'rebuild';
        NestedArray::setValue($form_state->getStorage(), $parents, $imported_tablefield['rebuild']);
      }
    }
    $form_state->setRebuild();
  }


  /**
   * Helper function to import data from a CSV file.
   *
   * @param string $form_field_name
   *
   * @return array $tablefield
   */
  private static function importCsv($form_field_name) {
    $file_upload = \Drupal::request()->files->get("files[$form_field_name]", NULL, TRUE);
    if (!empty($file_upload) && $handle = fopen($file_upload->getPathname(), 'r')) {
      // Populate CSV values.
      $tablefield = [];
      $max_cols = 0;
      $rows = 0;

      $separator = \Drupal::config('tablefield.settings')->get('csv_separator');
      while (($csv = fgetcsv($handle, 0, $separator)) !== FALSE) {
        foreach ($csv as $value) {
          $tablefield['table'][$rows][] = $value;
        }
        $cols = count($csv);
        if ($cols > $max_cols) {
          $max_cols = $cols;
        }
        $rows++;
      }
      fclose($handle);

      $tablefield['rebuild']['cols'] = $max_cols;
      $tablefield['rebuild']['rows'] = $rows;

      drupal_set_message(t('Successfully imported @file', ['@file' => $file_upload->getClientOriginalName()]));
      return $tablefield;
    }

    drupal_set_message(t('There was a problem importing @file.', ['@file' => $file_upload->getClientOriginalName()]));
    return FALSE;
  }

}
