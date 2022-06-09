App = {
    loading: false,
    contracts: {},
    doctors: [],
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
    // TODO: ask about view blockchain, verification, testCases, view 1 patient or all patients
    loadDoctorsDB: async() =>{
        // const doctors = require("/DoctorsDB.json");
        // const doctorsJsonString = fs.readFileSync("/DoctorsDB.json");
        // doctors = JSON.parse(doctorsJsonString);
        // console.log(App.doctors)
        // const crypto = require('node:crypto');
        for(var i=1; i<=5; i++){
            var publicK = "dummy";
            var privateK = "dummy"
 
// convert passphrase to base64 format
            // console.log("hnaaa",r_pass_base64)
            // const key1 = CryptoJS.AES.decrypt(publicK)
            // const key2 = CryptoJS.AES.decrypt(privateK)
            // console.log(key1)
            //TODO: put generation from salma 
            App.doctors.push({
                "id": i,
                "privateKey": privateK+i
            })
        }
        console.log(App.doctors);
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      const Web3 = require('web3')
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
        // web3.eth.defaultAccount = web3.eth.accounts[0]
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
      web3.eth.defaultAccount = App.account
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const todoList = await $.getJSON('TodoList.json')
      App.contracts.TodoList = TruffleContract(todoList)
      App.contracts.TodoList.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.todoList = await App.contracts.TodoList.deployed()
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
    //   await App.loadAccount()

      // Render Account
      $('#account').html(App.account)
  
      // Render Tasks
      await App.renderTasks()
  
      // Update loading state
      App.setLoading(false)
    },
  
    renderTasks: async () => {
      // Load the total task count from the blockchain
      const taskCount = await App.todoList.taskCount()
      const $taskTemplate = $('.taskTemplate')
  
      // Render out each task with a new task template
      for (var i = 1; i <= taskCount; i++) {
        // Fetch the task data from the blockchain
        const task = await App.todoList.tasks(i)
        const taskId = task[0].toNumber()
        const taskContent = task[1]
        const taskCompleted = task[2]
  
        // Create the html for the task
        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.content').html(taskContent)
        $newTaskTemplate.find('input')
                        .prop('name', taskId)
                        .prop('checked', taskCompleted)
                        .on('click', App.toggleCompleted)
  
        // Put the task in the correct list
        if (taskCompleted) {
          $('#completedTaskList').append($newTaskTemplate)
        } else {
          $('#taskList').append($newTaskTemplate)
        }
  
        // Show the task
        $newTaskTemplate.show()
      }
      // const doctorId = $('#doctorId').val()
      // privateKeyDoc = App.doctors[doctorId-1].privateKey;
      // const PatientCount = await App.todoList.patientCount()
      // const $patientTemplate = $('.patientTemplate')
      // for (var i = 1; i <= PatientCount; i++) {
      //   // Fetch the task data from the blockchain
      //   const patient = await App.todoList.patients(i)
      //   const patientId = patient[0]
      //   const patientName = CryptoJS.AES.decrypt(patient[1],privateKeyDoc).toString()
      //   const patientAge = CryptoJS.AES.decrypt(patient[2],privateKeyDoc).toString()
      //   const patientSex = CryptoJS.AES.decrypt(patient[3],privateKeyDoc).toString()
      //   const patientWeight = CryptoJS.AES.decrypt(patient[4],privateKeyDoc).toString()
      //   const patientPulse = CryptoJS.AES.decrypt(patient[5],privateKeyDoc).toString()
      //   const patientOxygen = CryptoJS.AES.decrypt(patient[6],privateKeyDoc).toString()
  
      //   // Create the html for the task
      //   const $newPatientTemplate = $patientTemplate.clone()
      //   $newPatientTemplate.find('.patientId').html(patientId)
      //   $newPatientTemplate.find('.patientName').html(patientName)
      //   $newPatientTemplate.find('.patientAge').html(patientAge)
      //   $newPatientTemplate.find('.patientSex').html(patientSex)
      //   $newPatientTemplate.find('.patientWeight').html(patientWeight)
      //   $newPatientTemplate.find('.patientPulse').html(patientPulse)
      //   $newPatientTemplate.find('.patientOxygen').html(patientOxygen)
       
      //   // Put the patient in the correct list
      //   $('#patientList').append($newPatientTemplate)
      //   // Show the task
      //   $newPatientTemplate.show()
      // }

    },

    viewPatients: async () => {
      // Load the total task count from the blockchain
      const doctorId = $('#doctorIdToView').val()
      console.log(doctorId)
      privateKeyDoc = App.doctors[doctorId-1].privateKey;
      const PatientCount = await App.todoList.patientCount()
      $('#patientList').remove('.patientTemplate')
      const $patientTemplate = $('.patientTemplate').remove()
      // const $patientTemplate = $('.patientTemplate')
      for (var i = 1; i <= PatientCount; i++) {
        // Fetch the task data from the blockchain
        const patient = await App.todoList.patients(i)
        const patientId = patient[0].toNumber()
        // console.log(patientId)s
        if(CryptoJS.AES.decrypt(patient[1],privateKeyDoc)==""){
          continue;
        }
        const patientName = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[1],privateKeyDoc))
        const patientAge = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[2],privateKeyDoc));
        const patientSex = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[3],privateKeyDoc))
        const patientWeight = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[4],privateKeyDoc))
        const patientPulse = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[5],privateKeyDoc))
        const patientOxygen = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(patient[6],privateKeyDoc))
  
        // Create the html for the task
        const $newPatientTemplate = $patientTemplate.clone()
        $newPatientTemplate.find('.patientId').html(patientId)
        $newPatientTemplate.find('.patientName').html(patientName)
        $newPatientTemplate.find('.patientAge').html(patientAge)
        $newPatientTemplate.find('.patientSex').html(patientSex)
        $newPatientTemplate.find('.patientWeight').html(patientWeight)
        $newPatientTemplate.find('.patientPulse').html(patientPulse)
        $newPatientTemplate.find('.patientOxygen').html(patientOxygen)
       
        // Put the patient in the correct list
        
        $('#patientList').append($newPatientTemplate)
        // Show the task
        $newPatientTemplate.show()
      }
      
    },

    
  
    createTask: async () => {
      App.setLoading(true)
      const content = $('#newTask').val()
      await App.todoList.createTask(content)
      window.location.reload()
    },
  
    toggleCompleted: async (e) => {
      App.setLoading(true)
      const taskId = e.target.name
      await App.todoList.toggleCompleted(taskId)
      window.location.reload()
    },

    createPatient: async () => {
        App.setLoading(true)
        // const patientCount = $('#newPatient').val()
        const doctorId = $('#doctorId').val()
        const name = $('#patientName').val()
        const age = $('#patientAge').val()
        const sex = $('#patientSex').val()
        const weight = $('#patientWeight').val()
        const pulse = $('#patientPulse').val()
        const oxygen = $('#patientOxygen').val()
        privateKeyDoc = App.doctors[doctorId-1].privateKey;
        console.log("hnaa");
        console.log(privateKeyDoc);
        const nameEnc = CryptoJS.AES.encrypt(name,privateKeyDoc).toString()
        console.log("encrypted name: ",nameEnc);
        const ageEnc = CryptoJS.AES.encrypt(age,privateKeyDoc).toString()
        const sexEnc = CryptoJS.AES.encrypt(sex,privateKeyDoc).toString()
        const weightEnc = CryptoJS.AES.encrypt(weight,privateKeyDoc).toString()
        const pulseEnc = CryptoJS.AES.encrypt(pulse,privateKeyDoc).toString()
        const oxygenEnc = CryptoJS.AES.encrypt(oxygen,privateKeyDoc).toString()
        // console.log(CryptoJS.AES.decrypt(nameEnc,privateKeyDoc).toString())

        // Patient(patientCount, _name, age, _sex, weight, pulse, oxygen);
        await App.todoList.createPatient(nameEnc, ageEnc, sexEnc, weightEnc, pulseEnc, oxygenEnc);
        window.location.reload()
    },

    createVisits: async () => {
      App.setLoading(true)
      // const patientCount = $('#newPatient').val()
      const doctorId = $('#doctorId1').val()
      const pID = $('#patientId').val()
      const reason = $('#reasonForVisit').val()
      const diagnoses = $('#doctorsDiagnoses').val()
      const pressure = $('#bloodPressure').val()
      const glucose = $('#glucose').val()
      const temperature = $('#temperature').val()
      const prescription = $('#prescription').val()
      privateKeyDoc = App.doctors[doctorId-1].privateKey;
      console.log("hnaa");
      console.log(privateKeyDoc);
      const pIDEnc = CryptoJS.AES.encrypt(pID,privateKeyDoc).toString()
      // console.log("encrypted name: ",nameEnc);
      const reasonEnc = CryptoJS.AES.encrypt(reason,privateKeyDoc).toString()
      const diagnosesEnc = CryptoJS.AES.encrypt(diagnoses,privateKeyDoc).toString()
      const pressureEnc = CryptoJS.AES.encrypt(pressure,privateKeyDoc).toString()
      const glucoseEnc = CryptoJS.AES.encrypt(glucose,privateKeyDoc).toString()
      const temperatureEnc = CryptoJS.AES.encrypt(temperature,privateKeyDoc).toString()
      const prescriptionEnc = CryptoJS.AES.encrypt(prescription,privateKeyDoc).toString()
      // console.log(CryptoJS.AES.decrypt(nameEnc,privateKeyDoc).toString())

      // Patient(patientCount, _name, age, _sex, weight, pulse, oxygen);
      await App.todoList.createVisit(pIDEnc, reasonEnc, diagnosesEnc, pressureEnc, glucoseEnc, temperatureEnc,prescriptionEnc);
      window.location.reload()
  },
   
  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    App.loadDoctorsDB()
    $(window).load(() => {
      App.load()
    })
  })