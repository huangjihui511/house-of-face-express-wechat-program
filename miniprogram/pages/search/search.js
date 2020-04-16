Page(
  {
    data: {
      focus: false,
      inputValue: '',
      toSearch: '',
      testButton: '',
      showPicList: ["/images/test.jpg","/images/test1.jpg"]
    },
    bindKeyInput: function(e) {
      this.setData(
        {inputValue:e.detail.value}
      )
    },
    bindConfirmClick: function(e) {
    /*  var getKeyword = this.inputValue
      if (getKeyword!=null) {
        this.setData({
          toSearch :getKeyword 
        })
      }
      else{
        this.setData({
          toSearch:'888'
        })
      } */
      var value = e.detail.value

      this.setData(
        {
          toSearch:value
        }
      );
      this.getShowPicList();
    },
    getShowPicList: function() {
      
    },
    confirm: function() {
          var v = this.data.toSearch
          this.setData({testButton:v})
    }
  }
)