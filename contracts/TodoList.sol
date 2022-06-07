pragma solidity >=0.5.0;

contract TodoList {
  uint public taskCount = 0;
  uint public patientCount = 0;
  uint public visitCount = 0;
  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createTask("Check out dappuniversity.com");
  }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

    struct Patient{
        uint id;
        string name;
        int age;
        string sex;
        int weight;
        int pulse;
        int oxygen;
    }

    struct Visit{
        uint id;
        string reasonForVisit;
        string doctorsDiagnoses;
        int bloodPressure;
        int glucose;
        int temperature;
        string prescription;
    }
 
    mapping(uint => Patient) public patients;
    mapping(uint => Visit) public visits;

    event PatientCreated(
        uint id, 
        string name, 
        int age, 
        string sex, 
        int weight, 
        int pulse, 
        int oxygen
    );

    event VisitCreated(
        uint id,
        string reasonForVisit,
        string doctorsDiagnoses,
        int bloodPressure,
        int glucose,
        int temperature,
        string prescription
    );

    function createPatient(string memory _name, int age, string memory _sex, int weight,int pulse, int oxygen ) public {
        patientCount ++;
        patients[patientCount] = Patient(patientCount, _name, age, _sex, weight, pulse, oxygen);
        emit PatientCreated(patientCount, _name, age, _sex, weight, pulse, oxygen);
    }

    function createVisit(string memory _reasonForVisit, string memory _doctorsDiagnoses, int bloodPressure,
        int glucose, int temperature, string memory _prescription ) public {
        visitCount ++;
        visits[visitCount] = Visit(visitCount, _reasonForVisit, _doctorsDiagnoses, bloodPressure, glucose, temperature,
        _prescription);
        emit VisitCreated(visitCount, _reasonForVisit, _doctorsDiagnoses, bloodPressure, glucose, temperature,
        _prescription);
    }

}