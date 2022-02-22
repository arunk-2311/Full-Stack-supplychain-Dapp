import React from 'react';

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customer: {
                firstName: props.firstName,
                lastName: props.lastName,
                status: props.status
            }
        }
    }

    render() {
        return (
            <div>
                <label>
                    First Name:
                </label>
                <input type="text" value={this.state.customer.firstName} />
                <br />
                <label>
                    Last Name:
                </label>
                <input type="text" value={this.state.customer.lastName} />
                <br />
                <label>
                    Status:
                </label>
                <select value={this.state.customer.status}>
                    <option value="PENDING">
                        Pending
                    </option>
                    <option value="APPROVED">
                        Approved
                    </option>
                </select>
            </div>
        );
    }
}