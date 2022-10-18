import React, {createRef} from "react";
import {ChatList, MessageList} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import {Button, Row, Col, Divider, Input, Card, Layout, Empty} from "antd";
import styles from './style.less';
import request from 'umi-request';
import $, { type } from 'jquery';
import { TagsOutlined } from "@ant-design/icons";

const {TextArea} = Input;
const { Header, Sider, Content } = Layout;
const socket = new WebSocket('ws://192.168.2.94:8282');

class ChatWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendMsg: ""
        }
        this.clickButton = this.clickButton.bind(this);
        this.messagesEnd = createRef();
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.chatUser !== nextProps.chatUser) {
            if (nextProps.chatUser) {
                this.setState({chatUser: nextProps.chatUser});
            }
        }
        if (this.props.msgDataList != nextProps.msgDataList) {
            if (nextProps.msgDataList) {
                this.setState({msgDataList: nextProps.msgDataList});
            }
        }
    }

    clickButton() {
        var msg_sender_receiver_id = JSON.stringify({'mode':'message', 'information': this.state.sendMsg, 'sender': this.props.ownner.id, 'receiver': this.props.chatUser.id, 'id': this.props.portId});
        socket.send(msg_sender_receiver_id); // 发送ownner的msg
        console.log('点send按钮，发送了：', msg_sender_receiver_id);
        // // 将ownner的msg放入消息列表
        // let list = this.state.msgDataList;
        // list.push({
        //     position: 'right',
        //     type: 'text',
        //     text: this.state.sendMsg,
        //     date: new Date(),
        // })
        // this.setState({msgDataList:list});
        this.setState({sendMsg: ""});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }

    render() {
        console.log('子组件render');
        return (
                <Layout style={{ height: '100%' }}>
                    <Header className={styles.header} >
                        {this.props.chatUser == null ? "" : this.props.chatUser.title}
                    </Header>

                    <Content>
                    <div id='chatpad' style={{
                                    width: "100%",
                                    height: 420,
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    fontSize: 20,
                                    overflow: "auto",
                                    backgroundColor: '#EDEDED'
                                }}
                            ref={(el) => {this.messagesEnd = el;}}>
                        <MessageList
                            className='message-list'
                            dataSource={this.props.msgDataList}
                            toBottomHeight={'100%'}
                        />
                    </div>
                    <Card>
                        <TextArea id="m" placeholder="Input here" autoSize={{ minRows: 2, maxRows: 5 }} onChange={e => {this.setState({sendMsg: e.target.value});}}
                                    ref={el => (this.inputRef = el)}
                                    value={this.state.sendMsg}/>
                        <Button type="primary" className={styles.sendButton} onClick={this.clickButton}>Send</Button>
                    </Card>
                    </Content>
                </Layout>
        );
    }
}

class PrivateChatView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ownner: null,
            userList: [],
            clickUser: null,
            msgDataList: [],
            portId: null
        }
    }   

    componentDidMount() {
        // ******************************** 加载聊天用户信息 **************************************** //
        var that = this;
        request.get('/api/get_chatroom_user', { getResponse: true }).then(function({data, response}) {
            var sender = data.data?.ownner;
            var receiverList = data.data?.chatUsers;

            // 发送ownner ID信息 登录服务器
            socket.send(JSON.stringify({'mode':'user', 'name':sender.id}));

            let list = [];
            var chatUsersNum = receiverList.length // 可以聊天的chatUser的列表长度
            for (let i = 0; i < chatUsersNum; ++i)
                list.push({
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    alt: 'Reactjs',
                    title: receiverList[i].username,
                    id: receiverList[i].id,
                    // subtitle: 'What are you doing?',
                    date: null,
                    // unread: Math.floor(Math.random() * 10),
                });
            
            that.setState({ownner: sender});
            that.setState({userList: list});
            that.setState({clickUser: list[0]});
        });
        // ********************************** 加载历史消息 **************************************** //
        socket.onmessage = e => {
            console.log('*********************************************************************************');

            // 获取消息端口信息
            {
                console.log('消息端口onmessage中');
                if (JSON.parse(e.data).mode == 'port_id') {
                    if(this.state.portId !== JSON.parse(e.data).id_information) {
                        this.setState({msgDataList:[]}); // 消息端口号变了 将历史消息清零
                        this.setState({portId:JSON.parse(e.data).id_information})
                    }
                }
            }


            // 拉取历史消息
            {
                console.log('历史信息onmessage中');
                var historyMsg;
                if (JSON.parse(e.data).mode == 'history_message') {
                    historyMsg = JSON.parse(e.data).information;
                    console.log("historyMsg:", historyMsg);
                }
                // 将chatUser的msg放入消息列表里
                let list = this.state.msgDataList;
                console.log('前：', this.state.msgDataList);
                if (historyMsg) {
                    historyMsg.forEach((val, i) => {
                        if (val.sender == this.state.ownner.id) {
                            list.push({
                                position: 'right',
                                type: 'text',
                                text: val.message,
                                date: new Date(val.time)
                            })
                        } else {
                            list.push({
                                position: 'left',
                                type: 'text',
                                text: val.message,
                                date: new Date(val.time)
                            })
                        }
                    })
                }
                
                console.log('后：', this.state.msgDataList);
                this.setState({msgDataList:list});
            }

            // 接受自己的消息
            {
                console.log('接受自己消息onmessage中');
                let list = this.state.msgDataList;
                if (JSON.parse(e.data).mode == 'message') {
                    if (JSON.parse(e.data).sender == this.state.ownner.id) {
                        list.push({
                            position: 'right',
                            type: 'text',
                            text: JSON.parse(e.data).information,
                            date: new Date(JSON.parse(e.data).time)
                        })
                    }
                }
                this.setState({msgDataList:list});
            }

            // 接收对方发来的信息
            {
                console.log('接受对方消息onmessage中');
                let list = this.state.msgDataList;
                if (JSON.parse(e.data).mode == 'message') {
                    if (JSON.parse(e.data).sender == this.state.clickUser.id) {
                        list.push({
                            position: 'left',
                            type: 'text',
                            text: JSON.parse(e.data).information,
                            date: new Date(JSON.parse(e.data).time)
                        })
                    }
                }
                this.setState({msgDataList:list});
            }
        }
    }

    render() {
        console.log('父组件render');

        return (
            <Layout style={{ height: '100%' }}>
                <Row>
                <Col style={{
                       width: '20%',
                       height: 620,
                       display: 'inline-block',
                       overflow:"auto"}}>
                    <ChatList
                        className={styles.ChatList}
                        onClick={e => {
                            console.log('选择用户');
                            // 选择聊天对象
                            this.setState({clickUser: e}); 
                            // 发送chatUser ID信息
                            socket.send(JSON.stringify({'mode': 'receiver', 'user1': this.state.ownner.id, 'user2': e.id}));
                        }}
                        dataSource={this.state.userList}/>
                </Col>
                    <ChatWidget chatUser={this.state.clickUser} ownner={this.state.ownner} msgDataList={this.state.msgDataList} portId={this.state.portId}/>
                </Row>
            </Layout>
        );
    }
}

export default PrivateChatView;