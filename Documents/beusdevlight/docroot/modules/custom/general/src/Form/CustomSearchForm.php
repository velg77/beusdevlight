<?php

/**
 * @file
 * Contains \Drupal\general\Form\CustomSearchForm.
 */
namespace Drupal\general\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;


class CustomSearchForm extends FormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'custom_search_form';
  }
  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['faculty_search_field'] = array(
      '#type' => 'textfield',
      '#attributes' => array('class' => array('faculty-search-box')),
      '#attributes' => array(
        'placeholder' => t('Search directory'),
      ),
    );
    $form['personsearch'] = array(
      '#type' => 'button',
      '#value' => $this->t('Search'),
    );
    return $form;
  }
   /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
   
  }
}