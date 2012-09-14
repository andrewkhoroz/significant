<?php

class JavaScriptController extends Zend_Controller_Action {

    /**
     * This action is the home page of the website
     *
     */
    public function indexAction() {
        $this->view->title = 'Stoyan Stefanov - JavaScript Patterns 2010';
        $this->view->headTitle('Stoyan Stefanov - JavaScript Patterns 2010');
    }

}
