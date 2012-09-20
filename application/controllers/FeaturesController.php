<?php

class FeaturesController extends Zend_Controller_Action {

    /**
     * This action is the home page of the website
     *
     */
    public function indexAction() {
        $this->view->title = 'Features';
        $this->view->headTitle('Features');
    }

}
