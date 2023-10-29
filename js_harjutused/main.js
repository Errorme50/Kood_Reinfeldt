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
function harjutus5(string){
    let reverse = string.reverse();
    console.log(reverse);
}
// idk kuidas teha
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
