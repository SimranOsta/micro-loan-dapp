// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MicroLoan {
    enum Status { Requested, Funded, Withdrawn, Repaid, Defaulted }

    struct Loan {
        address borrower;
        address lender;
        uint256 principal;
        uint256 repayment;
        uint64 dueDate;
        Status status;
    }

    uint256 public loanCounter;
    mapping(uint256 => Loan) public loans;

    event Requested(uint256 indexed id, address indexed borrower, uint256 principal, uint256 repayment, uint64 dueDate);
    event Funded(uint256 indexed id, address indexed lender);
    event Withdrawn(uint256 indexed id, address indexed borrower);
    event Repaid(uint256 indexed id, address indexed borrower);
    event Defaulted(uint256 indexed id);

    function requestLoan(uint256 _principal, uint256 _repayment, uint64 _dueDate) external returns (uint256) {
        require(_repayment >= _principal, "Repayment must cover principal");
        require(_dueDate > block.timestamp, "Due date must be in future");

        loanCounter++;
        loans[loanCounter] = Loan({
            borrower: msg.sender,
            lender: address(0),
            principal: _principal,
            repayment: _repayment,
            dueDate: _dueDate,
            status: Status.Requested
        });

        emit Requested(loanCounter, msg.sender, _principal, _repayment, _dueDate);
        return loanCounter;
    }

    function fund(uint256 _id) external payable {
        Loan storage loan = loans[_id];
        require(loan.status == Status.Requested, "Loan not requested");
        require(msg.value == loan.principal, "Incorrect funding amount");

        loan.lender = msg.sender;
        loan.status = Status.Funded;

        emit Funded(_id, msg.sender);
    }

    function withdrawToBorrower(uint256 _id) external {
        Loan storage loan = loans[_id];
        require(loan.status == Status.Funded, "Loan not funded");
        require(msg.sender == loan.borrower, "Only borrower can withdraw");

        loan.status = Status.Withdrawn;
        payable(loan.borrower).transfer(loan.principal);

        emit Withdrawn(_id, loan.borrower);
    }

    function repay(uint256 _id) external payable {
        Loan storage loan = loans[_id];
        require(loan.status == Status.Withdrawn, "Loan not withdrawn");
        require(block.timestamp <= loan.dueDate, "Loan overdue");
        require(msg.value == loan.repayment, "Incorrect repayment amount");

        loan.status = Status.Repaid;
        payable(loan.lender).transfer(msg.value);

        emit Repaid(_id, msg.sender);
    }

    function markDefault(uint256 _id) external {
        Loan storage loan = loans[_id];
        require(loan.status == Status.Withdrawn, "Loan not active");
        require(block.timestamp > loan.dueDate, "Loan not overdue yet");

        loan.status = Status.Defaulted;

        emit Defaulted(_id);
    }
}