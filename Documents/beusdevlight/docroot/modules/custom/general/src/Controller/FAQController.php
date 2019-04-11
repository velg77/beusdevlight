<?php

namespace Drupal\general\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Defines HelloController class.
 */
class FAQController extends ControllerBase {

  /**
   * Display the markup.
   *
   * @return array
   *   Return markup array.
   */
  public function index() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello, World!'),
    ];
  }

} 