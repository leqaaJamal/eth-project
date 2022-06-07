pragma solidity >=0.4.22 <0.9.0;
contract HealthCare {
uint public patientsCount = 0;
uint public doctorsCount = 0;
mapping (uint => Patient) public patients;
mapping (uint => Doctor) public doctors;
address public admin;



constructor() public {
        admin = msg.sender;
        signUpPatient("Farah Ehab", 23,60, 160, "F", "O");
        signUpPatient("Miral ", 23,60, 165, "F", "B");
        // signUpDoctor("Dr Max","Cardiologists");
        // signUpDoctor("Dr Hope ", "Dermatologists");

    }




  struct Patient {
    uint id;
    string name;
    uint age;
    uint weight;
    uint height;
    string gender;
    string bloodType;
  }

   struct Doctor {
    uint id;
    string name;
    string specialization;
  }



 function signUpPatient(string memory _name, uint _age, uint _weight,uint _height,string memory _gender,string memory _bloodType) public {
    patientsCount++;
    patients[patientsCount] = Patient(patientsCount,_name,_age,_weight,_height,_gender,_bloodType);
  }


 function signUpDoctor(string memory _name,string memory _specialization) external onlyAdmin() {
    doctorsCount++;
    doctors[doctorsCount] = Doctor(doctorsCount,_name,_specialization);
  }

//   function visitDoctor(){

//   }
 



 modifier onlyAdmin(){
        require(msg.sender == admin, 'Only Admin');
        _;
    }
    // modifier onlyDoctor(){
    //     require(msg.sender == doctor, 'Only Doctor Can Do That'); m7tgeen n loop 3la kol el doctors w n check if he's a doctor
    //     _;
    // }
    // modifier onlyPatient(){
    //     require(msg.sender == patient, 'Only Patient Can Do That'); m7tgeen n loop 3la kol el patients w n check if he's a patient
    //     _;
    // }


  // constructor() public {
  //     signUpPatient("Farah Ehab", 23,60, 160, "F", "O");
  // }
  


}