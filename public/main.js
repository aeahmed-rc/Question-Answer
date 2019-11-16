let trash= document.getElementsByClassName('fa fa-trash')

let btn= document.getElementsByClassName('button')
let addReply=document.getElementsByClassName('addReply')
let submitAnswer=document.getElementsByClassName('submitAnswer')

Array.from(addReply).forEach(function(element){
  element.addEventListener('click',function(){
    console.log('hi')
    let form=document.querySelector(".hidden").style.display='block'
  });
});

Array.from(submitAnswer).forEach(function(element){
  element.addEventListener('click',function(){
    let answers=document.getElementById("userComment").value
    console.log(answers)
    let questions=this.parentNode.parentNode.childNodes[1].innerText
    console.log(questions)
    // const questions= document.querySelector(".question")
    fetch('questions',{
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
  'questions':questions,
  'answers': answers
})
})
  .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload()
    })
  });
});










Array.from(trash).forEach(function(element) {
        element.addEventListener('click', function(){
console.log("by")
          const questions= this.parentNode.parentNode.childNodes[1].innerText
          // const button=this.parentNode.parentNode.childNodes[3]
          // console.log(button)
          // const comment= this.parentNode.parentNode.childNodes[3].innerText
          fetch('questions', {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'questions':questions,
              // 'button':button,


              // "comment":span,


            })
          }).then(function (response) {
            window.location.reload()
          })
        });
        // Array.from(trash).forEach(function(element) {
        //         element.addEventListener('click', function(){
        //
        //           const questions= this.parentNode.parentNode.childNodes[1].innerText
        //
        //           // const comment= this.parentNode.parentNode.childNodes[3].innerText
        //           fetch('questions', {
        //             method: 'delete',
        //             headers: {
        //               'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //               'questions':questions,
        //
        //               // "comment":span,
        //
        //
        //             })
        //           }).then(function (response) {
        //             window.location.reload()
        //           })
        //         });
  });
