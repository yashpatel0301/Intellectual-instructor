import React from 'react';
import { render } from 'react-dom';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class SectionScroll extends React.Component {

    constructor(props) {
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
    }

    scrollToTop() {
        scroll.scrollToTop();
      }
    componentDidMount() {
        scroll.scrollToTop();
      }
    componentWillUnmount() {
        scroll.scrollToTop();
    }
    render(){
        return <div></div>
    }
};
export default SectionScroll;
