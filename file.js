function CalcTip() {
    originalbill = document.getElementById('totalbill').value;
    tipamount = originalbill * 0.20;
    document.getElementById('showtip').innerHTML = tipamount;
}
