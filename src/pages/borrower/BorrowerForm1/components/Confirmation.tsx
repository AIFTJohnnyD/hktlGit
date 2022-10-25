import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {FormattedMessage} from 'umi';
import { Divider, Alert, Input, Checkbox } from 'antd';
import styles from '../style.less';
import { getLocale} from 'umi';
import { ProFormCheckbox } from '@ant-design/pro-form';

const { TextArea } = Input;

const Confirmation: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function declaration_str() {
    if(getLocale() === 'zh-CN'){
      return "[请输入香港公司名称]以及[请输入香港公司名称] (以下合称“本公司”) 向XXXXX 确认并保证本贷款申请(“本申请”)内所载资料均是真实无讹、\
      准确并完整。本公司同意XXXXX有权随时向任何第叁者索取有关本公司的资料，包括但不限于向信贷资料服务机构进行查阅。\
      本公司确认提交本申请之人士已获得本公司授权进行一切与本申请有关之事项。本公司谨此声明本公司具偿债能力，现时没有涉及任何破产、\
      诉讼或行政程序，或此等待决事项，或按本公司在作出一切合理查询后所知，威胁会展开该等事项。本公司声明本公司并无与其他贷款人作出任何对本公司偿还\
      XXXXX就此申请批出的贷款 (如有) 构成阻碍的安排。此外，本公司确认及同意在本公司完全偿还XXXXX贷款之前，不会自愿性申请破产。\
      本公司明白申请贷款批核乃参考本公司提供之申请资料及文件，贷款审批结果最终由XXXXX决定，而XXXXX没有责任就拒绝此贷款申请提供任何原因。\
      XXXXX对本申请及由其直接或间接引起的一切的争议拥有最终决定权。本公司明白并同意在收到XXXXX通知成功获批结果后，\
      本公司须确认接受XXXXX的条款及细则，当中包括《XXXXX平台条款及细则》(“平台条款”)。本公司确认已详阅并明白平台条款，\
      并同意受平台条款所约束。本公司确认已经详阅并明白附载于本申请页面的XXXXX收集个人资料声明（“个人资料声明”），\
      并且同意受XXXXX私隐政策约束，包括但不限于，XXXXX按个人资料声明及私隐政策收集、使用及披露本公司的个人资料。\
      本公司明白为向本公司提供服务，XXXXX可能把本申请中的个人资料转移至香港境外，交予XXXXX位于中国的集团公司及/或XXXXX的代理人\
      (包括, 但不限于, XXXXX聘用来追讨XXXXX的客户过期的贷款的第三方公司)。该地区可能没有与《个人资料(私隐)条例》\
      (香港法例第四八六章)大体上相似或达致与此条例的目的相同目的之法律，亦即是说，本申请中的个人资料未必可以获得与在香港相同或类似程度的保障。\
      本公司确认本公司并未与XXXXX以外的任何人(“第三方”)因促致、洽商、取得或申请此笔贷款，及/或因担保或保证此笔贷款的偿还，或由于与该等事务有关，\
      达成或签订任何协议（本公司与本公司委任的律师纯粹为提供法律服务而达成或签订的协议除外）。本公司明白此确认的目的是确保本公司不会被任何第叁方另行征收费用。\
      本公司根据《电子交易条例》(香港法例第五五叁章)第十五条同意XXXXX以电子纪录或以电子方式向本公司提供借香港法律(包括但不限于放债人条例(香港法例第一六叁章)) \
      须以书面形式提供之资料。本公司明白XXXXX可不时向为XXXXX推荐客户的业务合作伙伴提供费用或佣金，且本公司同意XXXXX此等安排。";
    }
    else if(getLocale() === 'zh-TW'){
      return  "[請輸入香港公司名稱]以及[請輸入香港公司名稱] (以下合稱“本公司”) 向XXXXX 確認並保證本貸款申請(“本申請”)內所載資料均是真實無訛、準確並完整。\
      本公司同意XXXXX有權隨時向任何第叁者索取有關本公司的資料，包括但不限於向信貸資料服務機構進行查閱。本公司確認提交本申請之人士已獲得本公司授權進行一切與本申請有關之事項。\
      本公司謹此聲明本公司具償債能力，現時沒有涉及任何破產、訴訟或行政程序，或此等待決事項，或按本公司在作出一切合理查詢後所知，威脅會展開該等事項。本公司聲明本公司並無與其他貸款人\
      作出任何對本公司償還XXXXX就此申請批出的貸款 (如有) 構成阻礙的安排。此外，本公司確認及同意在本公司完全償還XXXXX貸款之前，不會自願性申請破產。本公司明白申請貸款批核乃參考本公司提供之申請資料及文件，\
      貸款審批結果最終由XXXXX決定，而XXXXX沒有責任就拒絕此貸款申請提供任何原因。 XXXXX對本申請及由其直接或間接引起的一切的爭議擁有最終決定權。本公司明白並同意在收到XXXXX通知成功獲批結果後，\
      本公司須確認接受XXXXX的條款及細則，當中包括《XXXXX平台條款及細則》(“平台條款”)。本公司確認已詳閱並明白平台條款，並同意受平台條款所約束。本公司確認已經詳閱並明白附載於本申請頁面的XXXXX收集個人資料聲明（“個人資料聲明”），\
      並且同意受XXXXX私隱政策約束，包括但不限於，XXXXX按個人資料聲明及私隱政策收集、使用及披露本公司的個人資料。本公司明白為向本公司提供服務，XXXXX可能把本申請中的個人資料轉移至香港境外，交予XXXXX位於中國的集團公司及/或XXXXX的代理人\
      (包括, 但不限於, XXXXX聘用來追討XXXXX的客戶過期的貸款的第三方公司)。該地區可能沒有與《個人資料(私隱)條例》(香港法例第四八六章)大體上相似或達致與此條例的目的相同目的之法律，亦即是說，本申請中的個人資料未必可以獲得與在香港相同或類似程度的保障。\
      本公司確認本公司並未與XXXXX以外的任何人(“第三方”)因促致、洽商、取得或申請此筆貸款，及/或因擔保或保證此筆貸款的償還，或由於與該等事務有關，達成或簽訂任何協議（本公司與本公司委任的律師純粹為提供法律服務而達成或簽訂的協議除外）。\
      本公司明白此確認的目的是確保本公司不會被任何第叁方另行徵收費用。本公司根據《電子交易條例》(香港法例第五五叁章)第十五條同意XXXXX以電子紀錄或以電子方式向本公司提供借香港法律(包括但不限於放債人條例(香港法例第一六叁章)) 須以書面形式提供之資料。\
      本公司明白XXXXX可不時向為XXXXX推薦客戶的業務合作夥伴提供費用或佣金，且本公司同意XXXXX此等安排。";
    }
    else{
      return '[Please enter the name of the Hong Kong company] and [Please enter the name of the Hong Kong company] \
      (hereinafter collectively referred to as the "Company") confirm and warrant to XXXXX that the information contained in this loan application (the "Application") is true, \
      accurate and complete. The company agrees that XXXXX has the right to request information about the company from any third party at any time, including but not limited to \
      access to credit reference agencies.The company confirms that the person submitting this application has been authorized by the company to carry out all matters related to this application. \
      The Company hereby declares that the Company is solvent and is not currently involved in any bankruptcy, litigation or administrative proceedings, or pending matters, or threats to commence \
      such matters to the knowledge of the Company having made all reasonable enquiries. The Company declares that the Company has not entered any arrangement with other lenders that would prevent \
      the Company from repaying the loan (if any) granted by XXXXX in connection with this application. In addition, the Company confirms and agrees that it will not voluntarily file for bankruptcy \
      until the Company has fully repaid the XXXXX loan.The company understands that the application for loan approval is based on the application materials and documents provided by the company. \
      The final decision of the loan approval result is determined by XXXXX, and XXXXX is not responsible for providing any reason for rejecting this loan application. XXXXX has the final decision \
      on this application and all disputes arising directly or indirectly from it. The company understands and agrees that after receiving the XXXXX notification of the successful approval result, \
      the company must confirm the acceptance of the terms and conditions of XXXXX, including the "XXXXX Platform Terms and Conditions" ("Platform Terms"). \
      The company confirms that it has read and understood the platform terms and agrees to be bound by the platform terms.';
    }
  }

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title={<FormattedMessage id='pages.borrower_form.confirm_info'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <div style={{ height: 600 }}>
          <div className={styles.desc}>
            <h1 align="center">{<FormattedMessage id='pages.borrower_form.confirm_info.amount'/>}</h1>
            <h3 align="center">$10,000 - $50,000 USD</h3>
            <h4 align="center">{<FormattedMessage id='pages.borrower_form.confirm_info.interest'/>}</h4>

            <p>{<FormattedMessage id='pages.borrower_form.confirm_info.handling_fee'/>}</p>
            <p>{<FormattedMessage id='pages.borrower_form.confirm_info.declaration1'/>}</p>
            <Divider style={{ margin: '40px 0 24px' }} />
            <TextArea rows={8} value={declaration_str()}/>

            <a href="https://tolosupplychains.com/">
              <p>{<FormattedMessage id='pages.borrower_form.confirm_info.declaration3'/>}</p>
            </a>

            <div style={{width: 1030}}>
              <ProFormCheckbox 
                name="checkbox_company_1"
                rules={[
                  {
                    required: true,
                    message:  (<FormattedMessage id='pages.borrower_form.confirm_info.check_box'/>)
                  },
                ]}
              >
                {<FormattedMessage id='pages.borrower_form.confirm_info.check_box1'/>}
              </ProFormCheckbox>

              <ProFormCheckbox
                name="checkbox_company_2"
                rules={[
                  {
                    required: true,
                    message: (<FormattedMessage id='pages.borrower_form.confirm_info.check_box'/>)
                  },
                ]}
              >
                {<FormattedMessage id='pages.borrower_form.confirm_info.check_box2'/>}
              </ProFormCheckbox>
            </div>
          </div>
        </div>
      </ProCard>
    </RcResizeObserver>
  );
};

export default Confirmation;
