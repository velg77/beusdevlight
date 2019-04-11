<?php
/**
* @file
* Contains \Drupal\general\Plugin\Block\AdmissionsNaturalFormBlock.
*/
namespace Drupal\general\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;
/**
* Provides a 'admissionsnaturalformblock' block.
*
* @Block(
*   id = "admissinsnaturalformblock_block",
*   admin_label = @Translation("Natural block"),
*   category = @Translation("Custom Natural block ")
* )
*/
class AdmissionsNaturalFormBlock extends BlockBase {
 /**
  * {@inheritdoc}
  */
 public function build() {
   $form = \Drupal::formBuilder()->getForm('Drupal\general\Form\AdmissionsNaturalForm');
   return $form;
  }
}