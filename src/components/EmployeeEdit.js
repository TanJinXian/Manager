import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Communications from "react-native-communications";
import { CardSection, Card, Button, Confirm } from "./common";
import EmployeeForm from "./EmployeeForm";
import { employeeUpdate, employeeSave, employeeDelete } from "../actions";

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, props) => {
      this.props.employeeUpdate({ props, value });
    }); //loop each of the employee object and pass to the employeeUpdate action
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    }); //the this.props.employee.uid, the employee is from the EmployeeList component
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onConfirmPress() {}
  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button whenPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button whenPress={this.onTextPress.bind(this)}>Text Schedule</Button>
        </CardSection>

        <CardSection>
          <Button
            whenPress={() =>
              this.setState({ showModal: !this.state.showModal })
            }
          >
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  { employeeUpdate, employeeSave, employeeDelete }
)(EmployeeEdit);
