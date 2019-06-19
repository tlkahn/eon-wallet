import React from 'react';
import './GroupChatMemberPanel.css';
import fetchUsrInfo from '../../services/fetchUsrInfo';
import Spinner from '../Spinner'

export default class GroupChatMemberPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        usrInfo: []
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
      this.getUsrInfo(nextProps.memberIds);
  }

  getUsrInfo(memberIds) {
      let ps = Promise.all(memberIds.map(mid=>{
          return fetchUsrInfo(mid);
      }));
      ps.then(results=>{
          this.setState({
              usrInfo: results
          })
      });
  }

    render() {
        return (
            <div className="group-chat-member-icons-wrapper">
                {
                    this.state.usrInfo.length > 0 ? this.state.usrInfo.map(obj=>{
                        return (
                            <span key={"usr-info-"+obj.id} >
                                <img className="conversation-photo" src={obj.photo} alt="conversation" />
                            </span>
                        )
                    }) : null
                }
            </div>
        )
    }
}