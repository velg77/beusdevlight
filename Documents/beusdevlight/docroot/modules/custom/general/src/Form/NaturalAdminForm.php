<?php

/**
 * @file
 * Contains \Drupal\general\Form\NaturalForm.
 */
namespace Drupal\general\Form;

use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class NaturalAdminForm extends ConfigFormBase {  

  /**  
   * {@inheritdoc}  
   */  
    protected function getEditableConfigNames() {  
      return [  
        'general.adminsettings',  
      ];  
    }  

    /**   
     * {@inheritdoc}  
     */  
    public function getFormId() {  
      return 'general_admin_form';  
    } 

    public function buildForm(array $form, FormStateInterface $form_state) {

      $vocabulary_list = db_query("select vid, vid from {taxonomy_term_data} ")->fetchAllkeyed();
      $array1 = array('_none' => '-None-');
      $array2 = $vocabulary_list;
      $allvocabulary_list = array_merge($array1,$array2);
      
      $config = $this->config('general.adminsettings');  
      $form['faq'] = [
        '#type' => 'fieldset',
        '#title' => t('Academics Page Form Settings'),
        '#collapsible' => TRUE, 
        '#collapsed' => FALSE, 
      ];

      $form['faq']['faq_vocabulary'] = [
        '#type' => 'select',  
        '#title' => $this->t('Choose Vocabulary'),  
        '#description' => $this->t('Select Natural Form Vocabulary list'),  
        '#options' => $allvocabulary_list, 
        '#default_value' => $config->get('faq_vocabulary'),  
      ];
  
      $form ['faq']['faq_title'] = [
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => $config->get('faq_title'),
      ];

      $form ['faq']['faq_subtitle'] = [
        '#type' => 'textfield',
        '#title' => t('Sub Title'),
        '#default_value' => $config->get('faq_subtitle'),
      ];

      $form ['faq']['faq_child1'] = [
        '#type' => 'textfield',
        '#title' => t('Level 1 Title'),
        '#default_value' => $config->get('faq_child1'),
      ];

      $form ['faq']['faq_child2'] = [
        '#type' => 'textfield',
        '#title' => t('Level 2 Title'),
        '#default_value' => $config->get('faq_child2'),
      ]; 

      $form ['faq']['faq_child3'] = [
        '#type' => 'textfield',
        '#title' => t('Level 3 Title'),
        '#default_value' => $config->get('faq_child3'),
      ]; 
      
      $form['faq']['submit_label1'] = [
         '#type' => 'textfield',
         '#title' => t('Submit button Label1'),
         '#default_value' => $config->get('submit_label1'),
      ];

      $form['faq']['submit_label2'] = [
         '#type' => 'textfield',
         '#title' => t('Submit button Label2'),
         '#default_value' => $config->get('submit_label2'),
      ];

      $form['admissions'] = [
        '#type' => 'fieldset',
        '#title' => t('Admissions Page Form Settings'),
        '#collapsible' => TRUE, 
        '#collapsed' => FALSE, 
      ];

      $form['admissions']['admissions_vocabulary'] = [
        '#type' => 'select',  
        '#title' => $this->t('Choose Vocabulary'),  
        '#description' => $this->t('Select Natural Form Vocabulary List'),  
        '#options' => $allvocabulary_list, 
        '#default_value' => $config->get('admissions_vocabulary'),  
      ];
  
      $form['admissions']['admissions_title'] = [
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => $config->get('admissions_title'),
      ];

      $form['admissions']['admissions_subtitle'] = [
        '#type' => 'textfield',
        '#title' => t('Sub Title'),
         '#default_value' => $config->get('admissions_subtitle'),
      ]; 

      $form['admissions']['admissions_child1'] = [
        '#type' => 'textfield',
        '#title' => t('Level 1 Title'),
        '#default_value' => $config->get('admissions_child1'),
      ]; 

      $form['admissions']['admissions_child2'] = [
        '#type' => 'textfield',
        '#title' => t('Level 2 Title'),
        '#default_value' => $config->get('admissions_child2'),
      ]; 

      $form['admissions']['admissions_child3'] = [
        '#type' => 'textfield',
        '#title' => t('Level 3 Title'),
        '#default_value' => $config->get('admissions_child3'),
      ];

      $form['admissions']['submit_label'] = [
         '#type' => 'textfield',
         '#title' => t('Submit button Label'),
         '#default_value' => $config->get('submit_label'),
      ];

      return parent::buildForm($form, $form_state);
     }

    public function submitForm(array &$form, FormStateInterface $form_state) {  
       

      $this->config('general.adminsettings')  
        ->set('faq_vocabulary', $form_state->getValue('faq_vocabulary'))
        ->set('faq_title', $form_state->getValue('faq_title')) 
        ->set('faq_subtitle', $form_state->getValue('faq_subtitle')) 
        ->set('faq_child1', $form_state->getValue('faq_child1'))
        ->set('faq_child2', $form_state->getValue('faq_child2'))
        ->set('faq_child3', $form_state->getValue('faq_child3'))  
        ->set('submit_label1', $form_state->getValue('submit_label1'))
        ->set('submit_label2', $form_state->getValue('submit_label2'))

        ->set('admissions_vocabulary', $form_state->getValue('admissions_vocabulary'))
        ->set('admissions_title', $form_state->getValue('admissions_title')) 
        ->set('admissions_subtitle', $form_state->getValue('admissions_subtitle')) 
        ->set('admissions_child1', $form_state->getValue('admissions_child1'))
        ->set('admissions_child2', $form_state->getValue('admissions_child2'))
        ->set('admissions_child3', $form_state->getValue('admissions_child3'))
        ->set('submit_label', $form_state->getValue('submit_label'))
        ->save();
           
    }   

}  




