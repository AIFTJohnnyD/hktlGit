export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/UserRegister',
          },
          {
            name: 'forgotPassword',
            path: '/user/forgotPassword',
            component: './user/ForgotPassword',
          },
          {
            name: 'register-result',
            path: '/user/register-result',
            component: './user/RegisterResult',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    icon: 'smile',
    component: './Chatroom',
  },
  {
    path: '/lender',
    name: 'lender',
    icon: 'table',
    routes: [
      {
        name: 'input',
        icon: 'table',
        path: '/lender/lender-form',
        component: './lender/LenderForm',
        access: 'canLenderNew',
      },
      {
        name: 'index',
        icon: 'table',
        path: '/lender/index-form',
        component: './lender/IndexForm',
        access: 'canLender',
      },
      {
        name: 'list',
        icon: 'table',
        path: '/lender/lender-list',
        component: './lender/LenderList',
        access: 'canAdmin',
      },
    ],
  },
  {
    path: '/borrower',
    name: 'borrower',
    icon: 'table',
    routes: [

      //香港公司输入信息
      {
        name: 'tableUpload',
        icon: 'table',
        path: '/borrower/tableUpload',
        component: './borrower/tableUpload',
        access: 'canBorrowerNew',
      },
      //香港公司输入信息
      {
        name: 'hk_input',
        icon: 'table',
        path: '/borrower/borrower-formhk',
        component: './borrower/BorrowerFormHK',
        access: 'canBorrowerNew',
      },
      //关联公司输入信息
      {
        name: 'mainland_input',
        icon: 'table',
        path: '/borrower/borrower-form',
        component: './borrower/BorrowerFormMainland',
        access: 'canBorrowerNew',
      },
      //香港公司文件上传
      {
        name: 'hk_file_upload',
        icon: 'table',
        path: '/borrower/borrower-form-hk_file_upload',
        component: './borrower/BorrowerFormHKFileUpload',
        access: 'canBorrowerNew',
      },
      //关联公司文件上传
      {
        name: 'mainland_file_upload',
        icon: 'table',
        path: '/borrower/borrower-form-mainland_file_upload',
        component: './borrower/BorrowerFormMainlandFileUpload',
        access: 'canBorrowerNew',
      },
      
      // {
      //   name: '原来的输入(更新)信息',
      //   icon: 'table',
      //   path: '/borrower/borrower-form1',
      //   component: './borrower/BorrowerForm1',
      //   access: 'canBorrowerNew1',
      // },
      {
        name: 'list',
        icon: 'table',
        path: '/borrower/borrower-list',
        component: './borrower/BorrowerList',
        access: 'canLenderAndAdmin',
      },      
      {
        name: 'list',
        hideInMenu: true,
        icon: 'table',
        path: '/borrower/borrower-approval',
        component: './borrower/BorrowerList_Approval',
        access: 'canLenderAndAdmin',
        layout: {
          hideMenu: true,
          hideNav: true,
          hideFooter: true,
        },
      },
    ],
  },

  {
    path: '/amount',
    name: 'amount',
    icon: 'table',
    routes: [
      {
        name: 'list',
        icon: 'table',
        path: '/amount/borrower-list',
        component: './amount/BorrowerList',
        access: 'canLenderAndAdmin',
      },      
    ],
  },

  /*    
  {
    path: '/loan',
    name: 'loan',
    icon: 'table',
    access: 'canLenderAndAdmin',
    routes: [
      {
        name: 'input',
        icon: 'table',
        access: 'canLender',
        path: '/loan/loan-form',
        component: './loan/LoanForm',
      },
      {
        name: 'list',
        icon: 'table',
        path: '/loan/loan-list',
        component: './loan/LoanList',
      },
    ],
  },
*/  
  {
    path: '/product',
    name: 'product',
    icon: 'table',
    access: 'canBorrowerAndAdmin',
    routes: [
      {
        name: 'input',
        icon: 'table',
        access: 'canBorrower',
        path: '/product/product-form',
        component: './product/ProductForm',
      },
      {
        name: 'list',
        icon: 'table',
        path: '/product/product-list',
        component: './product/ProductList',
      },
      {
        name: 'analysis',
        icon: 'smile',
        access: 'canBorrower',
        path: '/product/product-analysis',
        component: './product/ProductAnalysis',
      },
    ],
  },
  {
    path: '/application',
    name: 'application',
    icon: 'table',
    access: 'canLenderAndBorrowerAndAdmin',
    routes: [
      {
        name: 'input_inventory',
        icon: 'table',
        access: 'canBorrower',
        path: '/application/loan-application-inventory',
        component: './application/LoanApplication_Inventory',
      },
      {
        name: 'input_account_receivable',
        icon: 'table',
        access: 'canBorrower',
        path: '/application/loan-account_receivable',
        component: './application/LoanApplication_AccountReceivable',
      },
      {
        name: 'list',
        icon: 'table',
        access: 'canBorrower',
        path: '/application/loan-application-list-borrower',
        component: './application/LoanApplicationListBorrower',
      },
      {
        name: 'borrowerlist',
        icon: 'table',
        access: 'canLenderAndAdmin',
        path: '/application/borrower-list',
        component: './application/BorrowerList',
      },      
      {
        name: 'list',
        icon: 'table',
        access: 'canLenderAndAdmin',
        path: '/application/loan-application-list-lender',
        component: './application/LoanApplicationListLender',
      },
      {
        name: 'analysis',
        hideInMenu: true,
        icon: 'smile',
        path: '/application/borrower-analysis',
        component: './application/BorrowerAnalysis',
        access: 'canLenderAndAdmin',
      },
      //用于先查看KYC再审批额度，隐藏菜单栏显示
      {
        name: 'analysis',
        hideInMenu: true,
        icon: 'smile',
        path: '/application/borrower-analysis-amount-approval',
        component: './application/BorrowerAnalysis',
        access: 'canLenderAndAdmin',
        layout: {
          hideMenu: true,
          hideNav: true,
          hideFooter: true,
        }, 
      },         
      {
        name: 'approval',
        hideInMenu: true,
        icon: 'smile',
        path: '/application/loan-application-approval',
        component: './application/LoanApplicationListLender_Approval',
        access: 'canLenderAndAdmin',
        layout: {
          hideMenu: true,
          hideNav: true,
          hideFooter: true,
        },
      },     
    ],
  },

  {
    path: '/platform',
    name: 'platform',
    icon: 'table',
    access: 'canAdmin',
    routes: [
      {
        name: 'loanapplicationlist',
        icon: 'table',
        access: 'canAdmin',
        path: '/platform/loan-application-list',
        component: './platform/LoanApplicationList',
      },
      {
        name: 'borrowerlist',
        icon: 'table',
        access: 'canAdmin',
        path: '/platform/borrower-list',
        component: './platform/BorrowerList',
      },      
    ],
  },

  {
    path: '/postloan',
    name: 'postloan',
    icon: 'table',
    access: 'canLenderAndBorrower',
    routes: [
      {
        name: 'repaymentapplication',
        icon: 'table',
        access: 'canBorrower',
        path: '/postloan/repayment-application',
        component: './postloan/RepaymentApplication',
      },
      {
        name: 'repaymentapproval',
        icon: 'table',
        access: 'canLender',
        path: '/postloan/repayment-approval',
        component: './postloan/RepaymentApproval',
      },
    ],
  },

  {
    path: '/testing',
    name: 'testing',
    icon: 'table',
    access: 'canLenderAndBorrowerAndAdmin',
    routes: [
      {
        name: 'testing',
        icon: 'table',
        access: 'canLenderAndBorrowerAndAdmin',
        path: '/testing',
        component: './testing/testing',
      },
    ],
  },

  {
    path: '/result',
    name: 'result',
    hideInMenu: true,
    routes: [
      {
        name: 'success',
        hideInMenu: true,
        path: '/result/success',
        component: './result/success',
      },
      {
        name: 'fail',
        hideInMenu: true,
        path: '/result/fail',
        component: './result/fail',
      },
    ],
  },

  {
    component: './404',
  },
];
