const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all departments
  findAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  // Create a new department
  createDepartment(department) {
    this.connection.query(
      "INSERT INTO department SET ?",
      {
        name: department.name,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }

  // Find all roles
  findAllRoles() {
    return this.connection.query("SELECT * FROM role");
  }

  // Create a new role
  createRole(role) {
    {
      this.connection.query(
        "INSERT INTO role SET ?",
        {
          title: role.title,
          salary: role.salary,
          department_id: role.department_id,
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      return;
    }
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }

  findManagerRole() {
    return this.connection.query(
      "SELECT employee.manager_id, role.title FROM employee INNER JOIN role ON employee.role_id = role.id"
    );
  }

  // Create a new employee
  createEmployee(employee) {
    this.connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: employee.first_name,
        last_name: employee.last_name,
        role_id: employee.role_id,
        manager_id: employee.manager_id,
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }

  // Update the given employee's role
  updateEmployeeRoleDB(employeeId, roleId) {
    this.connection.query(
      "UPDATE employee SET role_id='?' WHERE id='?'",
      [roleId, employeeId],
      function (err, res) {
        if (err) throw err;
      }
    );
    return;
  }
}

module.exports = new DB(connection);
