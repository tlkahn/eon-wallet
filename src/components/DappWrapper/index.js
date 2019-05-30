import React from 'react';
import ReactDOM from 'react-dom';
import {
    Page,
    BackButton
} from 'react-onsenui';

class Frame extends React.Component {
  componentDidMount() {
    this.iframeHead = this.node.contentDocument.head
    this.iframeRoot = this.node.contentDocument.body
    this.forceUpdate()
  }

  render() {
    const { children, head, ...rest } = this.props
    return (

      <iframe {...rest} ref={node => (this.node = node)}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}


export default class DappWrapper extends React.Component {
    render() {
        return (
            <Page>
                <div>
                    <BackButton>
                        Press me
                    </BackButton>
                </div>
                <iframe src={this.props.url} />
            </Page>
        )
    }
}


