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

    public function shareAction() {
        $this->view->headScript()->appendFile($this->view->baseUrl() . '/js/jQuery/jquery.scrolllock.js');
        $this->_helper->viewRenderer->setResponseSegment('share');
    }

    public function sidebarAction() {
        $this->_helper->viewRenderer->setResponseSegment('sidebar');
    }

}
