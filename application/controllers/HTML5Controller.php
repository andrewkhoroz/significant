<?php

class HTML5Controller extends Zend_Controller_Action {

    /**
     * This action is the home page of the website
     *
     */
    public function indexAction() {
        $this->view->title = '15 CSS3 Navigation and Menu Tutorials and Techniques';
        $this->view->headTitle('15 CSS3 Navigation and Menu Tutorials and Techniques');
    }

    public function offlineAction() {
        $this->view->title = 'Offline Applications';
        $this->view->headTitle('Offline Applications');
    }

}
