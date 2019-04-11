<?php

/**
 * @file
 * Contains \Drupal\general\Form\NaturalForm.
 */
namespace Drupal\general\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\SettingsCommand;

// services:
//   general.natural_form:
//   class: Drupal\general\NaturalForm

class NaturalForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'general';
  }

  /**
   * {@inheritdoc}
   */
  public function taxonomy_get_tree(){

    $config = $this->config('general.adminsettings');
    $Vocabulary_tid = $config->get('faq_vocabulary');
    $terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree($Vocabulary_tid); 
    $taxonomy_term_list = [];
    $parents_term_name = [];
   
    /**
     * Changing taxonomy data to array format
     */
    foreach ($terms as $item) {
      if ($item->depth == 0) {
        $parent = $item->tid;
        $taxonomy_term_list[$parent][$item->tid] = $item->name;
        $parents_term_name[$item->tid] = $item->name;
      } elseif ($item->depth == 1) {
        $child = $item->tid;
        $taxonomy_term_list[$parent]['child'][$item->tid] = $item->name;
      } elseif ($item->depth == 2) {
        // Todo Don't use taxonomy term load, get the url from the table using join query
        $term_object = taxonomy_term_load($item->tid);
        $term_name = $term_object->get('field_url_faq')->uri;
        $taxonomy_term_list[$parent][$child]['subchild'][$item->tid] = [
          'name' => $item->name,
          'url' => $term_name
        ];
     
      }
    }
     
    return [
      'tree' => $taxonomy_term_list,
      'parent' => $parents_term_name
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $config = $this->config('general.adminsettings');
    $data = &drupal_static(__FUNCTION__);
    $cid = 'faqnaturalform';

    if ($cache = \Drupal::cache()->get($cid)) {
      $data = $cache->data;
    }
    else {
      $taxonomy_term_list = $this->taxonomy_get_tree();
      $data = $taxonomy_term_list;
      \Drupal::cache()->set($cid, $data);
    }

    $parents_term_name = $data['parent'];
    $parent_tree = $data['tree'];

    $form['title'] = [
      '#title' => $config->get('title'),
    ];

    $form['faq_title'] = [
      '#type' => 'markup',
      '#title' => ('markup_content'),
      '#markup' => '<h2 class="block-title">' . $config->get('faq_title') . '</h2>',
    ];
    
    $form['faq_subtitle'] = [
      '#type' => 'markup',
      '#title' => ('markup_content'),
      '#markup' => '<p>' . $config->get('faq_subtitle') . '</p>',
    ];

    $form['faq_child1'] = [
      '#title' => $config->get('faq_child1'),
      '#type' => 'select',
      '#options' => $parents_term_name,
      '#attributes' => ['class' => ['natural_child1'], 'id' => ['child1']],
    ];

    $form['faq_child2'] = [
      '#title' => $config->get('faq_child2'),
      '#type' => 'select',
      '#options' =>[],
      '#attributes' => ['class' => ['natural_child2'], 'id' => ['child2']],
    ];

    $form['faq_child3'] = [
      '#title' => $config->get('faq_child3'),
      '#type' => 'select',
      '#options' => [],
      '#attributes' => ['class' => ['natural_child3'], 'id' => ['child3']],
    ];
    
    $form['submit_label1'] = [
      '#type' => 'submit',
      '#value' => $config->get('submit_label1'),
    ];

    $form['submit_label2'] = [
      '#type' => 'submit',
      '#value' => $config->get('submit_label2'),
    ];

    $form['#attached']['drupalSettings']['generalparent_tree'] = $parent_tree;
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
  

  }
}






