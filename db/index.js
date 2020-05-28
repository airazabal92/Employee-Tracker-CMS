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
        console.log("Success");
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
    // UNCOMMENT the line betow to code your query to create role
    // return this.connection.query(YOUR_QUERY_FOR_INSERT);
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findManagerRole() {
    return this.connection.query(
      "SELECT employee.manager_id, role.title FROM employee INNER JOIN role ON employee.role_id = role.id"
    );
  }

  // Create a new employee
  createEmployee(employee) {
    // UNCOMMENT the line below to code your insert query
    // return this.connection.query(YOUR_QUERY_FOR_INSERT);
    return this.connection.query(
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
  }

  // Update the given employee's role
  updateEmployeeRole(employeeId, roleId) {
    // UNCOMMENT the line bolow to code your query to update role id for the given employee
    // return this.connection.query(YOURY_QUERY_FOR UPDATE);
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {}

  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {}
}

module.exports = new DB(connection);
