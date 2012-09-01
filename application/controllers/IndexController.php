<?php

class IndexController extends Zend_Controller_Action {

    /**
     * This action is the home page of the website
     *
     */
    public function indexAction() {
        $this->view->title = 'Hello World !';
        $this->view->headTitle('Hello World !');
    }

}
