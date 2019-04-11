<?php
/**
* @file
* Contains \Drupal\general\Plugin\Block\NaturalFormBlock.
*/
namespace Drupal\general\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;
/**
* Provides a 'naturalformblock' block.
*
* @Block(
*   id = "naturalformblock_block",
*   admin_label = @Translation("Natural block"),
*   category = @Translation("Custom Natural block ")
* )
*/
class NaturalFormBlock extends BlockBase {
 /**
  * {@inheritdoc}
  */
 public function build() {
   $form = \Drupal::formBuilder()->getForm('Drupal\general\Form\NaturalForm');
   return $form;
  }
}