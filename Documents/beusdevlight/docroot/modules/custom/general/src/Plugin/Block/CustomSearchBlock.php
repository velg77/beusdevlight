<?php
/**
 * @file
 * Contains \Drupal\general\Plugin\Block\CustomSearchBlock
 */
namespace Drupal\general\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;
/**
 * Provides a 'generalsearchblock' block.
 *
 * @Block(
 *   id = "general_search_block",
 *   admin_label = @Translation("Custom Search block"),
 *   category = @Translation("Custom Search Block")
 * )
 */
class CustomSearchBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('Drupal\general\Form\CustomSearchForm');
    return $form;
   }
}