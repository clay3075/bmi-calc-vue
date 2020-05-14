let colors = {
    'underweight': 'lightblue',
    'normal': 'greenyellow',
    'overweight': 'orange',
    'obese': 'red'
};

let faces = {
    'underweight': function(ctx) {
        ctx.moveTo(0, 20);
        ctx.lineTo(300, 70);
    },
    'normal': function(ctx) {
        ctx.moveTo(0, 20);
        ctx.bezierCurveTo(0, 150, 300, 150, 300, 20);
    },
    'overweight': function(ctx) {
        ctx.moveTo(0, 20);
        ctx.lineTo(300, 20);
    },
    'obese': function(ctx) {
        ctx.moveTo(0, 150);
        ctx.bezierCurveTo(0, 20, 300, 20, 300, 150);
    }
};

function getClassification(bmi) {
    var classification = '';
    if (bmi < 18.5) {
        classification = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        classification = 'normal';
    } else if (bmi >=25 && bmi < 30) {
        classification = 'overweight';
    } else {
        classification = 'obese';
    }

    return classification;
}

var app = new Vue({
    el: '#app',
    data: {
      weight: 150,
      height: 72,
      bmi: 0,
      smileyColor: 'greenyellow'
    },
    mounted: function() {
        this.updateBMI();
    },
    methods: {
        updateBMI: function() {
            console.log(this.height);
            weightInKg = this.lbsToKg(this.weight);
            console.log(weightInKg)
            heightInMeters = this.inchesToMeters(this.height);
            console.log(heightInMeters)
            this.bmi = weightInKg / (heightInMeters * heightInMeters);
            this.bmi = this.bmi.toFixed(2);
            this.updateSmiley();
        },
        updateSmiley: function() {
            this.smileyColor = colors[getClassification(this.bmi)];
            var c = document.getElementById("mouth");
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.lineWidth = 20;
            ctx.beginPath();
            faces[getClassification(this.bmi)](ctx);
            ctx.stroke();
        },
        lbsToKg: function(lbs) {
            return lbs / 2.205;
        },
        inchesToMeters: function(inches) {
            return inches / 39.37;
        }
    }
});
