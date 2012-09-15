<?php

class GamesController extends Zend_Controller_Action {

    /**
     * This action is the home page of the website
     *
     */
    public function indexAction() {
        $this->view->title = 'Games';
        $this->view->headTitle('Games');
    }

    public function testAction() {
        $this->view->title = 'Hello World !';
        $this->view->headTitle('Hello World !');
    }

    public function tanksAction() {
        $this->view->title = 'Tanks';
        $this->view->headTitle('Tanks');
    }

}
