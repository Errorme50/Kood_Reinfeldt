function harjutus1(nimi){
    console.log("Tere tulemast " + nimi);
}
function harjutus2(mark , mudel , värv){
    console.log("Minu auto on " + värv + " " + mark + " " + mudel + ".");
}
function harjutus3(pindala , kõrgus){
    let ruumala = pindala * kõrgus / 3
    console.log("Ruumala on " + ruumala);
}
function harjutus4(nimi){
    let lyh;
    if(nimi.length > 5){
        lyh = nimi.slice(0, 5);
        console.log(lyh + "...");
    } else {
        console.log(nimi);
    }
}
function harjutus5(nimi){
    let reverse = nimi.split(``);
    reverse = reverse.reverse()
    reverse = reverse.join()
    console.log(reverse);
}
// sain aru
function harjutus6(){
    for(let i = 1; i < 101; i++){
        console.log(i);
    }
}
function harjutus7(){
    for(let i = 100; i > 0; i--){
        console.log(i);
    }
}
function harjutus10(){
    let myNameComponents = ['Samuel', 'L', 'Jackson'];
    console.log("Mu nimi on " + myNameComponents.join(' '));
}
function harjutus11(){
    let hinded = [3, 5, 4, 3 , 4, 5, 3, 4, 2];
    let sum = 0;
    for(let i = 0; i < hinded.length; i++){
        sum += hinded[i];
    }
    let av = sum / hinded.length
    console.log(av);
}
function harjutus12(){
    let i = 1;
    while(i < 101){
        if(i % 3 == 0 && i % 5 == 0){
            console.log("Lütseum");
        }else if(i === 50){
            console.log("Tallinna Prantsuse Lütseum");
        }else if(i % 5 == 0){
            console.log("Prantsuse");
        } else if(i % 3 == 0){
            console.log("Tallinna");
        }
        i++;
    }
}
function harjutus13(massiiv) {
    if (massiiv.includes("Marek")) {
        console.log("Marek on massiivis");
    } else {
        console.log("Marek pole massiivis");
    }
}
let inimesed = [
    {
        nimi: 'Alice',
        vanus: 28,
        aadress: 'Pargi 7',
        telefon: '23857493',
        email: 'alice@eesti.ee'
    },
    {
        nimi: 'Bob',
        vanus: 32,
        aadress: 'Tänavaküla 12',
        telefon: '293463847',
        email: 'bob@gmail.com'
    },
    {
        nimi: 'Marek',
        vanus: 22,
        aadress: 'Metsatee 3',
        telefon: '8594032',
        email: 'marek@example.com'
    }
];

function harjutus14(inimesed) {
    let vanim = inimesed[0];
    let pikimAadress = inimesed[0];
    let lühimTelefon = inimesed[0];
    let eestiEmail;

    for (let inimene of inimesed) {
        if (inimene.vanus > vanim.vanus) {
            vanim = inimene;
        }
        if (inimene.aadress.length > pikimAadress.aadress.length) {
            pikimAadress = inimene;
        }
        if (inimene.telefon.length < lühimTelefon.telefon.length) {
            lühimTelefon = inimene;
        }
        if (inimene.email.includes("eesti")) {
            eestiEmail = inimene;
        }
    }

    console.log("Kõige vanem: " + vanim.nimi);
    console.log("Pikima aadressiga: " + pikimAadress.nimi);
    console.log("Lühima telefoninumbriga: " + lühimTelefon.nimi);
    if (eestiEmail) {
        console.log("E-post sisaldab sõna 'eesti': " + eestiEmail.nimi);
    }
}
function suurim(array){
    let n = array.length
    let suurim = array[0];
    for(let i = 1; i < n; i++){
        if(array[i] > suurim){
            suurim = array[i];
        }
    }
    return(suurim);
}
function celsiusToFarenheit(tempC){
    let tempF = (tempC * 9/5) + 32;
    console.log(tempF);
}
function korrutustabel(num){
    let mult;
    for(let i = 1; i < 11; i++){
        mult = num * i
        console.log(num + " * " + i + " = " + mult);
    }
}
function faktoriaal(num){
    let factorial = 1;
    for(let i = 1; i <= num; i++){
        factorial *= i;
    }
    return(factorial);
}
function tähed(height){
    for(let i = 1; i <= height; i++){
        for(let j = 1; j <= i; j++){
            ;//lisa arrayle tähti
        }
        console.log()//prindi array ja tühista array
    }
}
function algarv(num){
    let algarv = true
    for(let i = 2; i < num; i++){
        if(num % i === 0){
            algarv = false
        }
    }
    if(algarv === true){
        console.log("Tegu on algarvuga.");
    } else{
        console.log("Tegu ei ole algarvuga.");
    }
}