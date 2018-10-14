import _ from "lodash";
import React, { Component } from "react";
import { ListView } from "react-native";
import { connect } from "react-redux";
import { employeesFetch } from "../actions";
import EmployeeListItem from "./EmployeeListItem";

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  //to let the both this.props and nextProps also will be fire when the user is first navigate or back to the screen after to the employee create screen
  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <EmployeeListItem employee={employee} />;
  }

  render() {
    console.log(this.props);
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

// map/change the object into array in order to map the listView
const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }; //{shift: 'Monday', name: 'Jane', id: '1233344lk'};
  });

  return { employees };
};

export default connect(
  mapStateToProps,
  { employeesFetch }
)(EmployeeList);
