// import React from "react";
// import request from 'umi-request';
// import { Upload, message, Modal, Drawer, Empty, Button as ButtonANTD, Space, Dropdown, Menu, DatePicker, List, Typography, Popover} from "antd";
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, MessageSeparator, TypingIndicator, Sidebar, Search, ConversationList, Conversation, Avatar, ConversationHeader, AttachmentButton, SendButton, Button } from '@chatscope/chat-ui-kit-react';
// import { CloseOutlined, FieldTimeOutlined, FileTextOutlined, PlusOutlined} from '@ant-design/icons'
// import data from '@emoji-mart/data'

// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import './style.less';

// import * as _ from 'underscore'

// import io from 'socket.io-client';
// let socket = io ('ws://192.168.2.94:8585');

// class ChatWidget extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sendMsg: "",
//             previewVisible: false,
//             previewVisibleChat: false,
//             previewImage: '',
//             previewImageName: '',
//             openDrawer: false,
//             file: null,
//             fileList: [],
//             openPopover: false,
//             ifShowSearchBar: false,
//             ifShowSearchMenu: true,
//             datePickerOpen: false,
//             openHistoryResult: false,
//             disableTimePickerOkBtn: true,
//             historyDate: null,
//             searchWord: null
//         }
//         this.sendMsgButton = this.sendMsgButton.bind(this);
//         this.sendFileButton = this.sendFileButton.bind(this);
//         this.readFile = this.readFile.bind(this);
//         this.showMsg = this.showMsg.bind(this);
//         this.historyChoice = this.historyChoice.bind(this);
//         this.historyTextSearchResult = this.historyTextSearchResult.bind(this);
//     }

//     componentWillReceiveProps(nextProps, nextContext) {
//         if (this.props.clickUser !== nextProps.clickUser) {
//             if (nextProps.clickUser) {
//                 this.setState({clickUser: nextProps.clickUser});
//                 this.setState({ifShowSearchBar: false}); // 更新clickUser，不显示历史记录Search Bar
//             }
//         }
//         if (this.props.msgDataList !== nextProps.msgDataList) {
//             if (nextProps.msgDataList) {
//                 this.setState({msgDataList: nextProps.msgDataList});
//             }
//         }
//         if (this.props.systemMsg !== nextProps.systemMsg) {
//             if (nextProps.systemMsg) {
//                 this.setState({systemMsg: nextProps.systemMsg});
//             }
//         }
//     }

//     sendMsgButton() {
//         let tag;
//         if(this.props.msgDataList.length !== 0) {
//             var lastMsgDate = new Date([...this.props.msgDataList].reverse()[0].ymd);
//             var today = new Date();
//             if (lastMsgDate.getFullYear() === today.getFullYear() && lastMsgDate.getMonth() === today.getMonth() && lastMsgDate.getDate() === today.getDate()) {tag = 0}
//             else {tag = 1}
//         } else {tag = 1}

//         var msg_sender_receiver_id = JSON.stringify({'mode':'text', 'information': this.state.sendMsg, 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'id': this.props.portId, 'tag': tag, 'type': 'web'});
//         socket.emit('message', msg_sender_receiver_id); // 发送ownner的msg
//         console.log('点send按钮，发送了：', msg_sender_receiver_id);
//         socket.emit('message', JSON.stringify({'mode': 'input_now', 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'ifShow': false, 'type': 'web'})) //停止“对方正在输入中”
//         this.setState({sendMsg: ""});
//     }

//     sendFileButton() {
//         let tag;
//         if(this.props.msgDataList.length !== 0) {
//             var lastMsgDate = new Date([...this.props.msgDataList].reverse()[0].ymd);
//             var today = new Date();
//             if (lastMsgDate.getFullYear() === today.getFullYear() && lastMsgDate.getMonth() === today.getMonth() && lastMsgDate.getDate() === today.getDate()) {tag = 0}
//             else {tag = 1}
//         } else {tag = 1}

//         this.state.fileList.forEach((val,i) => {
//             if (val.base64.startsWith("data:image/")) {
//                 const img = JSON.stringify({'mode':'photo', 'information':val.base64, 'name': val.name, 'size': val.size, 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'id': this.props.portId, 'tag': tag, 'type': 'web'});
//                 console.log('点send按钮，发送了图片：', img);
//                 socket.emit('message', img);
//             }
//             else {
//                 const file = JSON.stringify({'mode':'file', 'information':val.base64, 'name': val.name, 'size': val.size, 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'id': this.props.portId, 'tag': tag, 'type': 'web'});
//                 console.log('点send按钮，发送了文件：', file);
//                 socket.emit('message', file);
//             }
//         })
//         this.setState({openDrawer:false});
//         this.setState({fileList: []});
//     }

//     readFile(file, fileList) {
//         console.log('图片文件们: ', file, fileList);
//         var reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             let currentFile = {'uid': file.uid, 'base64':reader.result, 'name':file.name, 'size':file.size.toString(), 'type':file.type};
//             this.setState({file:currentFile}); 

//             let list = this.state.fileList;
//             list.push(currentFile);
//             this.setState({fileList:list});
//         }
        
//     }

//     showMsg(msg) {
//         switch(msg.type) {
//             case "text": return <Message.TextContent text={msg.text} />;
//             case "photo": return <Message.CustomContent src={msg.uri} width={300}>
//                                     <div style={{
//                                         display: "flex",
//                                         alignItems: "center"
//                                         }}>
//                                         <img src={msg.uri} alt={msg.text} width="300" onClick={() => {this.setState({previewVisibleChat: true})}}/>
//                                         <Modal
//                                             visible={this.state.previewVisibleChat}
//                                             footer={null}
//                                             onCancel={() => {this.setState({previewVisibleChat: false})}}
//                                             closable={false}
//                                             >
//                                             <img
//                                                 src={msg.uri}
//                                                 alt={msg.text}
//                                                 style={{ width: '100%' }}
//                                             />
//                                         </Modal>
//                                     </div>
//                                  </Message.CustomContent>
//             case "file": return  <Message.CustomContent>
//                                     <div
//                                         style={{
//                                         display: "flex",
//                                         alignItems: "center"
//                                         }}
//                                     >
//                                         <div style={{marginRight: 8, marginTop: 8}}>
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width="32"
//                                                 height="32"
//                                                 fill="#ffffff"
//                                                 viewBox="0 0 16 16"
//                                             >
//                                                 <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
//                                             </svg>
//                                             <br />
//                                             <span style={{ fontSize: 8}}>{'  '+msg.size+'    '}</span>
//                                         </div>
//                                         <div>
//                                             <span style={{ color: "#fff" }}>{msg.text+'  '}</span>
//                                         </div>
//                                         <div style={{marginLeft: 8, marginRight: 6}}>
//                                             <a href={msg.uri} download={msg.text}>
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width="28"
//                                                 height="28"
//                                                 fill="#ffffff"
//                                                 viewBox="0 0 16 16"
//                                             >
//                                                 <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
//                                             </svg>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </Message.CustomContent>
//         }
//     }

//     historyChoice(e) {
//         if (e.key === "tmp_key-0")
//         {
//             this.setState({datePickerOpen: true});
//         }
//         if (e.key === "tmp_key-1")
//         {
//             // this.setState({isSearchBarOpen: true})
//             this.setState({ifShowSearchBar: true});
//             this.setState({ifShowSearchMenu: false});
//         }
//     }

//     historyTextSearchResult () {
//         return  (<div style={{height: 200, width: 200, overflow: 'auto'}}>
//                     <List
//                         bordered={false}
//                         size="small"
//                         dataSource={this.state.searchWord ? this.props.historyTextList : []}
//                         renderItem={(item) => (
//                             <List.Item>
//                                 <Typography.Text strong>[{this.props.showMsgDate(item.time)[0]}]</Typography.Text>
//                                 <Typography.Text italic>{item.sender === this.props.ownner.id ? ' you: ' : ' '}</Typography.Text>
//                                 {item.information}
//                             </List.Item>
//                         )}
//                     />
//                 </div>)   
//     }

//     render() {
//         return (
//             <ChatContainer>
//                 <ConversationHeader>
//                     <ConversationHeader.Back />
//                     <Avatar src={this.props.clickUser.avatar} name={this.props.clickUser.name} />
//                     <ConversationHeader.Content userName={this.props.clickUser.name} info={this.props.clickUser.status === 'available' ? "在线":"离线"} />
//                     <ConversationHeader.Actions>
//                         <Space>
//                             {this.state.ifShowSearchBar ? <Space><Popover trigger="focus" placement="bottom" content={this.historyTextSearchResult}><Search className="search-history-bar" placeholder="查询历史消息..." style={{fontSize: "0.8em"}} onChange={msg => {this.setState({searchWord: msg}); msg ? this.props.getHistoryMsgByText(this.props.portId, msg):null}}/></Popover><Button icon={<CloseOutlined />} onClick={e => {this.setState({ifShowSearchMenu: true}); this.setState({ifShowSearchBar: false})}}></Button></Space> : null}            
//                             {this.state.ifShowSearchMenu ? <Dropdown 
//                                 overlay={<Menu onClick={this.historyChoice}>
//                                             <Menu.Item>
//                                             <FieldTimeOutlined /> 按时间查找
//                                             </Menu.Item>
//                                             <Menu.Item>
//                                             <FileTextOutlined /> 按文本查找
//                                             </Menu.Item>
//                                         </Menu>} 
//                                 placement="bottomRight"
//                             >
//                                 <ButtonANTD 
//                                     type="link"
//                                     style={{
//                                         color: "#2b6a9b"
//                                     }}>
//                                         历史消息
//                                 </ButtonANTD>
//                             </Dropdown> : null}            
//                         </Space>
                        
//                         <Modal 
//                             title="请选择日期" 
//                             open={this.state.datePickerOpen} 
//                             onCancel={e => this.setState({datePickerOpen: false})} 
//                             footer={[<Button 
//                                         border 
//                                         onClick={e => {
//                                             this.setState({openHistoryResult:true}); 
//                                             this.setState({datePickerOpen:false}); 
//                                             this.props.getHistoryMsgByDate(this.props.portId, this.state.historyDate.getFullYear(), this.state.historyDate.getMonth()+1, this.state.historyDate.getDate());}} 
//                                         disabled={this.state.disableTimePickerOkBtn}>确 定</Button>]}
//                         >
//                             <DatePicker onChange={e => {
//                                 if (e) {
//                                     this.setState({disableTimePickerOkBtn: false});
//                                     this.setState({historyDate: e._d});
//                                 } else {
//                                     this.setState({disableTimePickerOkBtn: true});
//                                 }
//                                 }} />
//                         </Modal> 
//                         <Modal title="查找结果如下" closable={false} open={this.state.openHistoryResult} footer={null} onCancel={e => this.setState({openHistoryResult: false})}  bodyStyle={{height: '400px', overflowY: 'auto'}}>
//                             {this.props.historyMsgList.length !== 0 ?
//                             <MessageList>
//                             {this.props.historyMsgList.map((item, idx) => (
//                                 item.type === 'sysmessage' ? <MessageSeparator content={item.date} /> :
//                                 <Message model={{
//                                     direction: item.position
//                                 }}>
//                                     {this.showMsg(item)}
//                                     {item.position === "outgoing" ? <Message.Footer sentTime={item.date}/> : <Message.Footer sender={item.date}/>}
//                                 </Message>     
//                             ))}
//                             </MessageList>:<Empty description='没有更多消息'/>}
//                         </Modal> 
//                     </ConversationHeader.Actions>          
//                 </ConversationHeader>
                
//                 <MessageList onYReachStart={e => this.props.onYReachStart(e)} typingIndicator={this.props.inputNowStatus} loadingMore={this.props.loadingMore} disableOnYReachWhenNoScroll={true}>
//                     {this.props.loadedMsgList}
//                     {this.props.msgDataList.map((item, idx) => (
//                         item.type === 'sysmessage' ? <MessageSeparator content={item.date} /> :
//                         <Message model={{
//                             direction: item.position
//                           }}>
//                             {this.showMsg(item)}
//                             {item.position === "outgoing" ? <Message.Footer sentTime={item.date}/> : <Message.Footer sender={item.date}/>}
//                         </Message>     
//                     ))}
//                 </MessageList>

//                 <div as={MessageInput} style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     borderTop: "1px dashed #d1dbe4",
//                     position: "relative"
//                 }}>
//                     <AttachmentButton onClick={() => this.setState({openDrawer:true})} style={{
//                         fontSize: "1.2em",
//                         paddingLeft: "0.8em",
//                         paddingRight: "0.2em"
//                     }} />
//                     <MessageInput 
//                         onChange={msg => {
//                                     this.setState({sendMsg: msg}); 
//                                     if (msg) {socket.emit('message', JSON.stringify({'mode': 'input_now', 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'ifShow': true, 'type': 'web'}))}
//                                     if (!msg) {socket.emit('message', JSON.stringify({'mode': 'input_now', 'sender': this.props.ownner.id, 'receiver': this.props.clickUser.id, 'ifShow': false, 'type': 'web'}))} 
//                         }}
//                         value={this.state.sendMsg} sendButton={false} attachButton={false} onSend={this.sendMsgButton} style={{
//                         flexGrow: 1,
//                         borderTop: 0,
//                         flexShrink: "initial"
//                     }} />  
//                     <SendButton onClick={this.sendMsgButton} disabled={this.state.sendMsg.length === 0} style={{
//                         fontSize: "1.2em",
//                         marginLeft: 0,
//                         paddingLeft: "0.2em",
//                         paddingRight: "0.8em"
//                     }} />
                                                  
//                     {/* 上传图片和文件的抽屉 */}
//                     <Drawer
//                         title="上传图片或文件"             
//                         placement="bottom"
//                         height="220px"
//                         closable={true}
//                         closeIcon={<Button icon={<CloseOutlined />}></Button>}
//                         onClose={() => {this.setState({openDrawer:false}); this.setState({fileList: []})}}
//                         open={this.state.openDrawer}
//                         getContainer={false}
//                         destroyOnClose={true}
//                         extra={<SendButton border disabled={this.state.fileList.length === 0} onClick={this.sendFileButton}/>}
//                         style={{
//                             position: 'absolute',
//                             bottom: 0
//                         }}
//                     >
//                         <Upload
//                             name="file"
//                             listType = 'picture-card'
//                             beforeUpload={this.readFile}
//                             onPreview={file => {this.setState({
//                                                             previewVisible: true,
//                                                             previewImage: file.url || file.thumbUrl,
//                                                             previewImageName: file.name})}
//                                         }
//                             onChange={info => {
//                                 if (info.file.status === 'done') {
//                                     message.success(`${info.file.name} 上传成功`);
//                                 } else if (info.file.status === 'error') {
//                                     message.error(`${info.file.name} 上传失败`);
//                                 }
//                             }}

//                             onRemove = {(file) => { 
//                                 let list = this.state.fileList; 
//                                 list.forEach( (val, i) => {
//                                     if (val.uid === file.uid) {
//                                         list.splice(i, 1);
//                                     }
//                                 })
//                                 this.setState({fileList:list});
//                             }}
//                             >
                            
//                             <div style={{ marginTop: 8, color: '#666' }}><PlusOutlined /></div>
//                         </Upload>
//                         <Modal
//                             visible={this.state.previewVisible}
//                             footer={null}
//                             onCancel={() => {this.setState({previewVisible: false})}}
//                             >
//                             <img
//                                 src={this.state.previewImage}
//                                 alt={this.state.previewImageName}
//                                 style={{ width: '100%' }}
//                             />
//                         </Modal>
//                     </Drawer>
//                 </div>
//             </ChatContainer>
//         );
//     }
// }

// class PrivateChatView extends React.Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             userList: [],
//             userListConst: [],
//             ifClickUser: false,

//             ownner: null,
//             clickUser: null,
//             msgDataList: [],
//             portId: null,
//             inputNowStatus: false,
//             loadingMore: false,
//             receivedloadMsgList: [],
//             loadedMsgList: [],
//             previewVisibleChat: false,
//             historyMsgList: [], // 根据date获得的历史消息
//             historyTextList: [],
//             noMoreMessages: false,
//             last_loaded_msgList: null
//         }
//         this.searchUser = this.searchUser.bind(this);
//         this.countMsg = this.countMsg.bind(this);
//         this.onYReachStart = this.onYReachStart.bind(this);
//         this.showMsgDate = this.showMsgDate.bind(this);
//         this.showSysDate = this.showSysDate.bind(this);
//         this.showMsg = this.showMsg.bind(this);
//         this.putMsgIntoList = this.putMsgIntoList.bind(this);
//         this.getUserList = this.getUserList.bind(this);
//         this.getHistoryMsg = this.getHistoryMsg.bind(this);
//         this.getHistoryMsgByDate = this.getHistoryMsgByDate.bind(this);
//         this.getHistoryMsgByText = this.getHistoryMsgByText.bind(this);
//         this.getCount = this.getCount.bind(this);
//     }   

//     componentDidMount() { 
//         // ******************************** 登录用户 **************************************** //
//         var that = this;
//         request.get('/api/get_chatroom_user', { getResponse: true }).then(function({data, response}) {
//             var sender = data.data?.ownner;
//             // 发送ownner ID信息 登录服务器
//             that.setState({ownner: sender});
//             that.getUserList(sender);
//         });

//         socket.on('message', function (data)  {

//             // 获得unread值
//             {
//                 if (data.mode === 'recent_message') {
//                     console.log('接受unread值');
//                     let user_list = that.state.userList;
//                     user_list.forEach((val, i) => {
//                         if (val.id === data.sender) {
//                             user_list[i].unread = data.unread;
//                         }
//                     })
//                     that.setState({userList: user_list});
//                 }
//             }

//             // 获得初始status列表
//             {
//                 if (data.mode === 'userstatus') {
//                     console.log('接受用户状态初始化');
//                     let list = that.state.userList;
//                     data.user_list.forEach((user2, i2) => {
//                         list.forEach((user, i) => {
//                             if (user2.user_id === user.id) {
//                                 list[i].status = (user2.status === 1 ? "available" : "invisible")
//                             }
//                         })
//                     })
//                     that.setState({userList: list});
//                 }
//             }

//             // 接受用户状态
//             {
//                 if (data.mode === 'changestatus') {
//                     console.log('接受单个用户状态');
//                     let list = that.state.userList;
//                     list.forEach((val, i) => {
//                         if (val.id === data.whose) { list[i].status = (data.status === 1 ? "available" : "invisible") }
//                     })
//                     that.setState({userList: list});
//                 }
//             }

//             // "对方正在输入中"
//             {
//                 if (data.mode === 'input_now') {
//                     console.log("对方正在输入中");
//                     if (data.ifShow) { that.setState({inputNowStatus: <TypingIndicator content="对方正在输入中" />}) }
//                     else { that.setState({inputNowStatus: false}) }
//                 }
//             }

//             // 接收文字信息
//             // 显示未读消息数量
//             {
//                 let list = that.state.msgDataList;
//                 let user_list = that.state.userList;
//                 if (data.mode === 'text') {
//                     console.log('接受文字消息中...');
//                     let position;
//                     if (data.sender === that.state.ownner.id) { position = 'outgoing'}
//                     else { position = 'incoming'}

//                     list.push({
//                         position: position,
//                         type: 'text',
//                         text: data.information,
//                         date: that.showMsgDate(data.time)[0],
//                         ymd: that.showMsgDate(data.time)[1]
//                     })
//                     // 显示最近一条消息
//                     user_list.forEach((val, i) => {
//                         if (val.id === that.state.clickUser.id) {
//                             user_list[i].lastMsg = ( position === 'outgoing' ? "You: "+data.information : data.information )
//                         }
//                     })
//                 }
//                 that.setState({
//                     msgDataList: list,
//                     userList: user_list
//                 });
//             }

//             // 接受图片
//             {
//                 let list = that.state.msgDataList;
//                 let user_list = that.state.userList;
//                 if (data.mode === 'photo') {
//                     console.log('接受图片消息中...');
//                     let position;
//                     if (data.sender === that.state.ownner.id) {position = 'outgoing'}
//                     else { position = 'incoming'}

//                     list.push({
//                         position: position,
//                         type: 'photo',
//                         uri: data.information,
//                         width: 300,
//                         date: that.showMsgDate(data.time)[0],
//                         ymd: that.showMsgDate(data.time)[1]
//                     })
//                     // 显示最近一条消息
//                     user_list.forEach((val, i) => {
//                         if (val.id === that.state.clickUser.id) {
//                             user_list[i].lastMsg = ( position === 'outgoing' ? "You: sent an image" : "sent an image" )
//                         }
//                     })
//                 }
//                 that.setState({
//                     msgDataList: list,
//                     userList: user_list
//                 });
//             }

//             // 接受文件
//             {
//                 let list = that.state.msgDataList;
//                 let user_list = that.state.userList;
//                 if (data.mode === 'file') {
//                     console.log('接受文件消息中...');
//                     let position;
//                     if (data.sender === that.state.ownner.id) { position = 'outgoing'}
//                     else { position = 'incoming'}

//                     list.push({
//                         position: position,
//                         type: 'file',
//                         text: data.name,
//                         uri: data.information,
//                         size: data.size,
//                         date: that.showMsgDate(data.time)[0],
//                         ymd: that.showMsgDate(data.time)[1]
//                     })
//                     // 显示最近一条消息
//                     user_list.forEach((val, i) => {
//                         if (val.id === that.state.clickUser.id) {
//                             user_list[i].lastMsg = ( position === 'outgoing' ? "You: sent a file" : "sent a file" )
//                         }
//                     })
//                 }
//                 that.setState({
//                     msgDataList: list,
//                     userList: user_list
//                 });
//             }

//             // 接受最近一条消息
//             {
//                 let list = that.state.userList;
//                 if (data.mode === 'recent_message') {
//                     console.log('接受最近一条消息...');
//                     if (data.sender !== that.state.ownner.id) {
//                         list.forEach((val, idx) => {
//                             if (data.sender === val.id) { list[idx].lastMsg = data.infromation }
//                         })
//                     } else {
//                         list.forEach((val, idx) => {
//                             if (data.receiver === val.id) { list[idx].lastMsg = data.infromation }
//                         })
//                     }
//                     that.setState({userList: list});
//                 }
//             }
//         })

        
//     }

//     async getUserList (sender) {
//         console.log('HTTP获取用户列表');
//         await fetch ('http://192.168.2.94:8585/httpserver/testing', {
//             method: 'POST',
//             headers: new Headers({'content-type': 'application/json'}),
//             body: JSON.stringify({
//                 mode: 'user',
//                 name: this.state.ownner.id
//             })
//         })
//         .then (res => res.json())
//         .then (data => {
//             let list = [];
//             let user_list = data;
//             user_list.forEach((val, i) => {
//                 list.push({
//                     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//                     name: val.name,
//                     id: val.user_id,
//                     status: val.status === 1 ? "available" : "invisible",
//                     unread: val.unread,
//                     lastMsg: val.recent_message ? (val.sender === this.state.ownner.id ? 'You: '+ val.recent_message : val.recent_message) : null
//                 })
//             })
//             this.setState({userList: list});
//             this.setState({userListConst: list});
//             this.setState({clickUser: list[0]});
//             socket.emit('message', JSON.stringify({mode:'user', sender: sender.id, type: 'web', user_list: data}));
//         })
//     }

//     async getHistoryMsg (sender, receiver) {
//         console.log('333333', receiver);
//         console.log('HTTP获取历史消息');
//         await fetch ('http://192.168.2.94:8585/httpserver/testing', {
//             method: 'POST',
//             headers: new Headers({'content-type': 'application/json'}),
//             body: JSON.stringify({
//                 mode: 'receiver',
//                 sender: sender,
//                 receiver: receiver
//             })
//         })
//         .then (res => res.json())
//         .then (data => {
//             if(this.state.portId !== data.id_information) {
//                 this.setState({msgDataList:[]}); // 消息端口号变了 将历史消息清零
//                 this.setState({loadedMsgList: []});
//                 this.setState({portId:data.id_information})
//                 console.log('端口号:', this.state.portId);
//             }

//             var historyMsg;
//             historyMsg = data.information;
//             console.log("historyMsg:", historyMsg);
//             // 将chatUser的msg放入消息列表里
//             if (historyMsg) {
//                 this.setState({msgDataList:this.putMsgIntoList(historyMsg)});
//             }
//             socket.emit('message', JSON.stringify({mode: 'receiver', type: 'web', sender: sender, receiver: receiver}));
//         })
//     }

//     async getHistoryMsgByDate (portId, y, m, d) {
//         console.log('接受时间查询历史消息结果');
//         await fetch('http://192.168.2.94:8585/httpserver/testing', {
//             method: 'POST',
//             headers: new Headers({'content-type': 'application/json'}),
//             body: JSON.stringify({
//                 mode: 'history2',
//                 id: portId,
//                 year: y,
//                 month: m,
//                 day: d
//             })
//         })
//         .then (res => res.json())
//         .then (data => {
//             this.setState({historyMsgList: this.putMsgIntoList(data.information)});
            
//         })
//     }

//     getCount(msgDataList, loadedMsgList) {
//         var count = 0;
//         msgDataList.forEach((val, i) => {
//             if (val.type !== 'sysmessage') { count = count+1 }
//         })
//         loadedMsgList.forEach((val, i) => {
//             if (val.type.name !== 'MessageSeparator') { count=count+1 }
//         })
//         return count
//     }

//     async getHistoryMsgByText (portId, msg) {
//         console.log('接受文字查询的历史消息结果');
//         await fetch('http://192.168.2.94:8585/httpserver/testing', {
//             method: 'POST',
//             headers: new Headers({'content-type': 'application/json'}),
//             body: JSON.stringify({
//                 mode: 'history3',
//                 message: msg,
//                 id: portId
//             })
//         })
//         .then(res => res.json())
//         .then(data => {
//             this.setState({historyTextList: data.information});
//         })
//     }

//     async onYReachStart(e) {
//         if (this.state.loadingMore) {
//             return;
//         }
//         // this.setState({loadingMore: true});
//         if (this.state.noMoreMessages === false) {
            
//             await fetch('http://192.168.2.94:8585/httpserver/testing', {
//                 method: 'POST',
//                 headers: new Headers({'content-type' : 'application/json'}),
//                 body: JSON.stringify({
//                     mode: 'history1',
//                     id: this.state.portId,
//                     num: this.getCount(this.state.msgDataList, this.state.loadedMsgList)
//                 })
//             })
//             .then (res => res.json())
//             .then (data => {
//                 // 深复制
//                 let lml = JSON.parse(JSON.stringify(data.information));
//                 lml.shift();
//                 if (JSON.stringify(lml) !== this.state.last_loaded_msgList) {
//                     const received_loaded_messages = data.information;
//                     // console.log("上一条信息", this.state.last_loaded_msgList);
//                     // console.log("本条信息", JSON.stringify(lml));
//                     this.setState({noMoreMessages: data.no_more_message});
//                     // 删除掉loadedMsgList的第一条
//                     let deleteList = this.state.loadedMsgList;
//                     deleteList.splice(0, 1);
//                     this.setState({loadedMsgList: deleteList});
//                     // 条件满足，则删掉msgDataList第一条
//                     if (this.state.loadedMsgList.length === 0 && this.state.msgDataList[0].type === 'sysmessage') {
//                         let list = this.state.msgDataList;
//                         list.splice(0, 1);
//                         this.setState({msgDataList: list});
//                     }
                    
//                     var messages = [];
//                     let list = received_loaded_messages;
//                     list.reverse().forEach((val, i) => {
//                         let position;

//                         if (val.mode1 === 'sysmessage') {
//                             messages.push(<MessageSeparator content={this.showSysDate(val.information)} />)
//                         } else if (val.sender === this.state.ownner.id) { position = 'outgoing' }
//                         else { position = 'incoming' }

//                         if (val.mode1 === 'text') {
//                             messages.push(
//                                 <Message model={{ direction: position }}>
//                                     <Message.TextContent text={val.information} />
//                                     {position === "outgoing" ? <Message.Footer sentTime={this.showMsgDate(val.time)[0]}/> : <Message.Footer sender={this.showMsgDate(val.time)[0]}/>}
//                                 </Message>
//                             )
//                         }
//                         if (val.mode1 === 'photo') {
//                             messages.push(
//                                 <Message model={{ position: position }}>
//                                     <Message.CustomContent src={val.information} width={300}>
//                                         <div style={{
//                                                 display: "flex",
//                                                 alignItems: "center"
//                                                 }}>
//                                                 <img src={val.information} alt={val.name} width="300" onClick={() => {this.setState({previewVisibleChat: true})}}/>
//                                                 <Modal
//                                                     footer={null}
//                                                     onCancel={() => {this.setState({previewVisibleChat: false})}}
//                                                     closable={false}
//                                                     >
//                                                     <img
//                                                         src={val.information}
//                                                         alt={val.name}
//                                                         style={{ width: '100%' }}
//                                                     />
//                                                 </Modal>
//                                         </div>
//                                     </Message.CustomContent>
//                                 </Message>
//                             )
//                         }
//                         if (val.mode1 === 'file') {
//                             messages.push(
//                                 <Message model={{ position: position }}>
//                                     <Message.CustomContent>
//                                         <div
//                                             style={{
//                                             display: "flex",
//                                             alignItems: "center"
//                                             }}
//                                         >
//                                             <div style={{marginRight: 8, marginTop: 8}}>
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     width="32"
//                                                     height="32"
//                                                     fill="#ffffff"
//                                                     viewBox="0 0 16 16"
//                                                 >
//                                                     <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
//                                                 </svg>
//                                                 <br />
//                                                 <span style={{ fontSize: 8}}>{'  '+val.size+'    '}</span>
//                                             </div>
//                                             <div>
//                                                 <span style={{ color: "#fff" }}>{val.name+'  '}</span>
//                                             </div>
//                                             <div style={{marginLeft: 8, marginRight: 6}}>
//                                                 <a href={val.information} download={val.name}>
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     width="28"
//                                                     height="28"
//                                                     fill="#ffffff"
//                                                     viewBox="0 0 16 16"
//                                                 >
//                                                     <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
//                                                 </svg>
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </Message.CustomContent>
//                                 </Message>
//                             )           
//                         }   
//                     })
//                     this.setState({
//                         loadedMsgList: messages.reverse().concat(this.state.loadedMsgList),
//                         loadingMore: false,
//                         last_loaded_msgList: JSON.stringify(lml)
//                     });
//                 }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         } else {return;}
//     }

//     putMsgIntoList(msgList) {
//         let list = [];
//         msgList.forEach((val, i) => {
//             let position;
//             if (val.sender === this.state.ownner.id) { position = 'outgoing' }
//             else { position = 'incoming' }

//             if (val.mode1 === 'text') {
//                 list.push({
//                     position: position,
//                     type: 'text',
//                     text: val.information,
//                     date: this.showMsgDate(val.time)[0],
//                     ymd: this.showMsgDate(val.time)[1]
//                 })
//             }
//             if (val.mode1 === 'photo') {
//                 list.push({
//                     position: position,
//                     type: 'photo',
//                     text: val.name,
//                     uri: val.information,
//                     width: 200,
//                     date: this.showMsgDate(val.time)[0],
//                     ymd: this.showMsgDate(val.time)[1]
//                 })
//             }
//             if (val.mode1 === 'file') {
//                 list.push({
//                     position: position,
//                     type: 'file',
//                     text: val.name,
//                     uri: val.information,
//                     size: val.size,
//                     date: this.showMsgDate(val.time)[0],
//                     ymd: this.showMsgDate(val.time)[1]
//                 })                    
//             }
//             if (val.mode1 === 'sysmessage') {
//                 list.push({
//                     type: 'sysmessage',
//                     date: this.showSysDate(val.information)
//                 })
//             }
//         })
//         return list;
//     }

//     searchUser (msg) {
//         if (msg) {
//             let list = [];
//             this.state.userListConst.forEach((val, i) => {
//                 if (val.name.search(msg) !== -1) {
//                     list.push(val);
//                 }
//             })
//             this.setState({userList: list});
//         } 
//         if (!msg) {
//             this.setState({userList: this.state.userListConst});
//         }
//     }

//     countMsg (msgList) {
//         let count = 0;
//         msgList.forEach((val, i) => {
//             if (val.type !== 'sysmessage') { count = count + 1}
//         })
//         return count;
//     }

//     showMsgDate (t) {
//         const today = new Date();
//         let yesterday = new Date();
//         yesterday.setDate(yesterday.getDate()-1);
//         let timeList = t.split('/');
//         let year = parseInt(timeList[0]);
//         let month = parseInt(timeList[1])-1;
//         let date = parseInt(timeList[4]);
//         let hour = parseInt(timeList[5]);
//         let minute = parseInt(timeList[6]);
//         let second = parseInt(timeList[7]);
//         const testDay = new Date(year, month, date, hour, minute, second);
//         const ymd = (timeList[0]+'-'+timeList[1]+'-'+timeList[4]);

//         if (today.getFullYear() === testDay.getFullYear() && today.getMonth() === testDay.getMonth() && today.getDate() === testDay.getDate()) {
//             return [(timeList[5]+':'+timeList[6]), ymd]; // today
//         } else if (yesterday.getFullYear() === testDay.getFullYear() && yesterday.getMonth() === testDay.getMonth() && yesterday.getDate() === testDay.getDate()) {
//             return [('Yesterday'+' '+timeList[5]+':'+timeList[6]), ymd]; // yesterday
//         } else if (today.getFullYear() === year && (today.getMonth() !== testDay.getMonth() || today.getDate() !== testDay.getDate())) {
//             return [(timeList[1]+'/'+timeList[4]+' '+timeList[5]+':'+timeList[6]), ymd]; // other dates in this year
//         } else {
//             return [(timeList[1]+'/'+timeList[4]+'/'+timeList[0]+' '+timeList[5]+':'+timeList[6]), ymd]; // dates not in this year
//         }
//     }

//     showSysDate (t) {
//         const today = new Date();
//         let yesterday = new Date();
//         yesterday.setDate(yesterday.getDate()-1);
//         let timeList = t.split('/');
//         let year = parseInt(timeList[0]);
//         let month = parseInt(timeList[1])-1;
//         let date = parseInt(timeList[4]);
//         const testDay = new Date(year, month, date);

//         if (today.getFullYear() === testDay.getFullYear() && today.getMonth() === testDay.getMonth() && today.getDate() === testDay.getDate()) {return 'Today'}
//         else if (yesterday.getFullYear() === testDay.getFullYear() && yesterday.getMonth() === testDay.getMonth() && yesterday.getDate() === testDay.getDate()) {return 'Yesterday'}
//         else if (today.getFullYear() === testDay.getFullYear()) { return timeList[3]+', '+timeList[2] +' '+timeList[4]+', '+timeList[0] }
//         else { return timeList[3]+', '+timeList[2] +' '+timeList[4] }
//     }

//     showMsg(msg) {
//         switch(msg.type) {
//             case "text": return <Message.TextContent text={msg.text} />;
//             case "photo": return <Message.CustomContent src={msg.uri} width={300}>
//                                     <div style={{
//                                         display: "flex",
//                                         alignItems: "center"
//                                         }}>
//                                         <img src={msg.uri} alt={msg.text} width="300" onClick={() => {this.setState({previewVisibleChat: true})}}/>
//                                         <Modal
//                                             visible={this.state.previewVisibleChat}
//                                             footer={null}
//                                             onCancel={() => {this.setState({previewVisibleChat: false})}}
//                                             closable={false}
//                                             >
//                                             <img
//                                                 src={msg.uri}
//                                                 alt={msg.text}
//                                                 style={{ width: '100%' }}
//                                             />
//                                         </Modal>
//                                     </div>
//                                  </Message.CustomContent>
//             case "file": return  <Message.CustomContent>
//                                     <div
//                                         style={{
//                                         display: "flex",
//                                         alignItems: "center"
//                                         }}
//                                     >
//                                         <div style={{marginRight: 8, marginTop: 8}}>
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width="32"
//                                                 height="32"
//                                                 fill="#ffffff"
//                                                 viewBox="0 0 16 16"
//                                             >
//                                                 <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
//                                             </svg>
//                                             <br />
//                                             <span style={{ fontSize: 8}}>{'  '+msg.size+'    '}</span>
//                                         </div>
//                                         <div>
//                                             <span style={{ color: "#fff" }}>{msg.text+'  '}</span>
//                                         </div>
//                                         <div style={{marginLeft: 8, marginRight: 6}}>
//                                             <a href={msg.uri} download={msg.text}>
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width="28"
//                                                 height="28"
//                                                 fill="#ffffff"
//                                                 viewBox="0 0 16 16"
//                                             >
//                                                 <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
//                                             </svg>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </Message.CustomContent>
//         }
//     }
    

//     render() {
//         return (
//             <div style={{
//                 height: "650px",
//                 position: "relative"
//               }}>
//             <MainContainer responsive>
//                 <Sidebar position="left" scrollable={true}>
//                     <Search placeholder="查找用户..." onChange={msg => {this.searchUser(msg)}}/>
//                     <ConversationList>
//                     {this.state.userList.map((item, idx) => (
//                         <Conversation name={item.name}
//                             onClick={e => {
//                                 this.setState({ifClickUser: true});
//                                 console.log('选择用户');
//                                 // 设置选中高亮状态
//                                 let user_list = this.state.userList;
//                                 user_list.forEach((val, i) => {
//                                     val.active = false;
//                                     if (val.id === item.id) {
//                                         user_list[i].active = true;
//                                     }
//                                 })
//                                 // 选择聊天对象
//                                 if (this.state.clickUser !== item) {
//                                     this.setState({
//                                         clickUser: item,
//                                         noMoreMessages: false
//                                     });
//                                 }
//                                 // 拉取历史消息
//                                 this.getHistoryMsg(this.state.ownner.id, item.id);
//                                 // 清零unread
//                                 user_list.forEach((val, i) => {
//                                     if (val.id === item.id) {
//                                         user_list[i].unread = null;
//                                     }
//                                 })
//                                 this.setState({userList: user_list});
//                             }} 
//                             active={this.state.userList[idx].active}
//                             unreadCnt={this.state.userList[idx].unread}
//                             info={this.state.userList[idx].lastMsg}>
//                             <Avatar src={item.avatar} name={item.name} status={item.status} />
//                         </Conversation>
//                     ))}
//                     </ConversationList>
//                 </Sidebar>
                
//                 {this.state.ifClickUser ? <ChatWidget 
//                                             clickUser={this.state.clickUser} 
//                                             ownner={this.state.ownner} 
//                                             msgDataList={this.state.msgDataList}  
//                                             portId={this.state.portId} 
//                                             inputNowStatus={this.state.inputNowStatus} 
//                                             loadedMsgList={this.state.loadedMsgList} 
//                                             loadingMore={this.state.loadingMore} 
//                                             historyMsgList={this.state.historyMsgList}
//                                             historyTextList={this.state.historyTextList}
//                                             onYReachStart={this.onYReachStart} 
//                                             showSysDate={this.showSysDate} 
//                                             showMsgDate={this.showMsgDate}
//                                             getHistoryMsgByDate={this.getHistoryMsgByDate}
//                                             getHistoryMsgByText={this.getHistoryMsgByText}/> : <MessageList />}
//             </MainContainer>
//             </div>
//         );
//     }
// }

// export default PrivateChatView;