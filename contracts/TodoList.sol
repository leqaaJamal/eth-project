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
        string age;
        string sex;
        string weight;
        string pulse;
        string oxygen;
    }

    struct Visit{
        uint id;
        string patientId;
        string reasonForVisit;
        string doctorsDiagnoses;
        string bloodPressure;
        string glucose;
        string temperature;
        string prescription;
    }
 
    mapping(uint => Patient) public patients;
    mapping(uint => Visit) public visits;

    event PatientCreated(
        uint id, 
        string name, 
        string age, 
        string sex, 
        string weight, 
        string pulse, 
        string oxygen
    );

    event VisitCreated(
        uint id,
        string patientId,
        string reasonForVisit,
        string doctorsDiagnoses,
        string bloodPressure,
        string glucose,
        string temperature,
        string prescription
    );

    function createPatient(string memory _name, string memory age, string memory _sex, string memory weight,string memory pulse, string memory oxygen ) public {
        patientCount ++;
        patients[patientCount] = Patient(patientCount, _name, age, _sex, weight, pulse, oxygen);
        emit PatientCreated(patientCount, _name, age, _sex, weight, pulse, oxygen);
    }

    function createVisit(string memory patientId, string memory _reasonForVisit, string memory _doctorsDiagnoses, string memory bloodPressure,
        string memory glucose, string memory temperature, string memory _prescription ) public {
        visitCount ++;
        visits[visitCount] = Visit(visitCount, patientId, _reasonForVisit, _doctorsDiagnoses, bloodPressure, glucose, temperature,
        _prescription);
        emit VisitCreated(visitCount, patientId, _reasonForVisit, _doctorsDiagnoses, bloodPressure, glucose, temperature,
        _prescription);
    }

}