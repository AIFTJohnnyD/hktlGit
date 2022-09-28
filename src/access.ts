/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',

    canLender: currentUser && (currentUser.access === 'lender'),
    canLenderAndAdmin: currentUser && (currentUser.access === 'lender' || currentUser.access === 'admin'),

    canBorrower: currentUser && (currentUser.access === 'borrower'),
    canBorrowerAndAdmin: currentUser && (currentUser.access === 'borrower' || currentUser.access === 'admin'),

    canLenderAndBorrower: currentUser && (currentUser.access === 'lender' || currentUser.access === 'borrower'),
    canLenderAndBorrowerAndAdmin: currentUser && (currentUser.access === 'lender' || currentUser.access === 'borrower' || currentUser.access === 'admin'),

    canLenderNew: currentUser && (currentUser.access === 'lender' || currentUser.access === 'new_lender'),
    canBorrowerNew: currentUser && (currentUser.access === 'borrower' || currentUser.access === 'new_borrower'),
  };
}
