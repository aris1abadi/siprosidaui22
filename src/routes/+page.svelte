<script>
    /*
	format jadwal sederhana
	text 3 blok jadwal
	enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T

	*/

    import {
        resetAllValue,
        firtLoad,
        demoMode,
        conect_status,
        kontrolIDStore,
        newJadwalSiram,
        newJadwalPestisida,
        newJadwalBiopest,
        jadwalSiram,
        siramCount,
        jadwalPestisida,
        jadwalBiopest,
        ble_connected,
        runMode,
        lahan1_status,
        lahan2_status,
        lahan3_status,
        lahan4_status,
        siram_status,
        lengas1,
        lengas2,
        lengas3,
        lengas4,
        volumeAir,
        ambangLengas,
        durasiManual,
        clientIDStore,
        lengas1raw,
        lengas2raw,
        lengas3raw,
        lengas4raw,
        kalibrasiPestisida,
        kalibrasiAirPestisida,
        kalibrasiBiopest,
        kalibrasiAirBiopest,
        brokerUseStore,
        brokerPortUseStore,
        wifiSSIDStore,
        wifiPasswordStore,
        dosisPestisida,
        dosisAirPestisida,
        lahan1Pestisida_status,
        lahan2Pestisida_status,
        lahan3Pestisida_status,
        lahan4Pestisida_status,
        pestisida_status,
        lahan1Biopest_status,
        lahan2Biopest_status,
        lahan3Biopest_status,
        lahan4Biopest_status,
        dosisAirBiopest,
        dosisBiopest,
        biopest_status,
    } from "$lib/store/stores";
    import { onMount } from "svelte";
    import Modal from "$lib/Modal.svelte";
    import { get } from "svelte/store";
    import { kirimMsg } from "$lib/mqttHandle";
    import SveltyPicker from 'svelty-picker';
    import { base } from '$app/paths';

    let sts_count = 0;
    let myPassword = "";
    let showModal = false;
    //let pageNow = "login";
    let pageNow = "login";
    let alertType = 0;
    let timeOut = 0;

    //------------var siram---------------------
    let showjadwal = 0;
    let showMode = 0; //1 = jadwal ,2 = set durasi,alert
    let jadwal1Enable = false;
    let jadwal2Enable = false;
    let jadwal3Enable = false;
    let jadwal4Enable = false;
    let jadwal5Enable = false;

    let durasiSiram1 = 5;
    let durasiSiram2 = 5;
    let durasiSiram3 = 5;
    let durasiSiram4 = 5;
    let durasiSiram5 = 5;
    let waktuSiram1 = "06:00";
    let waktuSiram2 = "06:00";
    let waktuSiram3 = "06:00";
    let waktuSiram4 = "06:00";
    let waktuSiram5 = "06:00";
    let hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    let lahan = ["Lahan 1", "Lahan 2", "Lahan 3", "Lahan 4"];
    let pilihanHari1 = [0, 0, 0, 0, 0, 0, 0];
    let pilihanHari2 = [0, 0, 0, 0, 0, 0, 0];
    let pilihanHari3 = [0, 0, 0, 0, 0, 0, 0];
    let pilihanHari4 = [0, 0, 0, 0, 0, 0, 0];
    let pilihanHari5 = [0, 0, 0, 0, 0, 0, 0];
    let cekHari1 = [false, false, false, false, false, false, false];
    let cekHari2 = [false, false, false, false, false, false, false];
    let cekHari3 = [false, false, false, false, false, false, false];
    let cekHari4 = [false, false, false, false, false, false, false];
    let cekHari5 = [false, false, false, false, false, false, false];

    let pilihanLahan1 = [0, 0, 0, 0];
    let pilihanLahan2 = [0, 0, 0, 0];
    let pilihanLahan3 = [0, 0, 0, 0];
    let pilihanLahan4 = [0, 0, 0, 0];
    let pilihanLahan5 = [0, 0, 0, 0];
    let cekLahan1 = [false, false, false, false];
    let cekLahan2 = [false, false, false, false];
    let cekLahan3 = [false, false, false, false];
    let cekLahan4 = [false, false, false, false];
    let cekLahan5 = [false, false, false, false];

    let ambangLengas_local = 60;

    //------------var pestisida --------------
    let dosisAirPestisida1 = 1;
    let dosisPestisida1 = 1;
    let dosisAirPestisida2 = 1;
    let dosisPestisida2 = 1;
    let dosisAirPestisida3 = 1;
    let dosisPestisida3 = 1;
    let dosisAirPestisida4 = 1;
    let dosisPestisida4 = 1;
    let dosisAirPestisida5 = 1;
    let dosisPestisida5 = 1;

    let waktuSemprot1 = "06:00";
    let waktuSemprot2 = "06:00";
    let waktuSemprot3 = "06:00";
    let waktuSemprot4 = "06:00";
    let waktuSemprot5 = "06:00";

    //---------------var biopest ----------------

    let dosisAirBiopest1 = 1;
    let dosisBiopest1 = 1;
    let dosisAirBiopest2 = 1;
    let dosisBiopest2 = 1;
    let dosisAirBiopest3 = 1;
    let dosisBiopest3 = 1;
    let dosisAirBiopest4 = 1;
    let dosisBiopest4 = 1;
    let dosisAirBiopest5 = 1;
    let dosisBiopest5 = 1;

    //---------------var setup -----------------
    let set0_1 = 600;
    let set0_2 = 600;
    let set0_3 = 600;
    let set0_4 = 600;

    let set100_1 = 300;
    let set100_2 = 300;
    let set100_3 = 300;
    let set100_4 = 300;

    let username = "";
    let password = "";
    let newPassword1 = "";
    let newPassword2 = "";

    let kal_lengas1 = false;
    let kal_lengas2 = false;
    let kal_lengas3 = false;
    let kal_lengas4 = false;

    let pompaUtama_sts = false;
    let pompaSemprot_sts = false;
    let pompaPestisida_sts = false;
    let pompaAdukPestisida_sts = false;
    let pompaBiopest_sts = false;
    let pompaAdukBiopest_sts = false;
    let selenoidInletPestisida_sts = false;
    let selenoidOutletPestisida_sts = false;
    let selenoidInletBiopest_sts = false;
    let selenoidOutletBiopest_sts = false;

    let pilihKalibrasi = 0;

    let kontrolId_value = "";
    let prefixBroker_value = "wss://";
    let postfixBroker_value = "/mqtt";
    let brokerUse_value = "Pilih Server";
    let brokerPortUse_value = "";
    let wifiSSID_value = "---";
    let wifiPassword_value = "xxxx";

    //---------------------------------------------

    onMount(() => {
        resetAllValue();
        conect_status.set(false);
        //$demoMode = false;
    });

    function startSiprosida() {
        $firtLoad = false;
        if (myPassword === "bsip123") {
            $demoMode = false;
            kirimMsg("kontrol", 0, "login", myPassword);
            pageNow = "siram";
            //goto("/home");
        } else {
            showModal = true;
            setTimeout(() => {
                showModal = false;
            }, 2000);
        }
    }
    function startDemo() {
        $firtLoad = false;
        $demoMode = true;
        pageNow = "siram";
        //goto("/home");
    }

    //=============== siram====================
    function getAllStatus(page) {
        if (page === "login") {
            kirimMsg("kontrol", 1, "getAllStatus", "0");
        } else if (page === "siram") {
            kirimMsg("siram", 1, "getAllStatus", "0");
            setTimeout(loadJadwalSiram, 1000);
            setTimeout(getDurasiSiram, 2000);
            showjadwal = 0;
        } else if (page === "pestisida") {
            kirimMsg("pestisida", 1, "getStatus", "0");
            setTimeout(loadJadwalPestisida, 1000);
        } else if (page === "biopest") {
            kirimMsg("biopest", 1, "getStatus", "0");
            setTimeout(loadJadwalBiopest, 1000);
        }
    }
    function getDurasiSiram() {
        kirimMsg("siram", 0, "getDurasi", "0");
    }
    function loadJadwalSiram() {
        if ($jadwalSiram.length >= 200) {
            //console.log('jadwal siram len: ' + $jadwalSiram.length);
            loadJadwal("siram");
        } else {
            //default Jadwal
            console.log("load default jadwal");
            let jw =
                "0,1,0,07,00,1,1,1,1,1,1,1,1,1,1,1,02,04,5;0,2,0,11,30,1,1,1,1,1,1,1,1,1,1,1,03,10,3;0,3,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;0,4,0,11,30,1,1,1,1,1,1,1,1,1,1,1,0,0,3;0,5,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;";
            $jadwalSiram = jw;
            loadJadwal("siram");
        }
    }

    function siramLahan(lahan) {
        let lahanSts = "0";
        if ($conect_status || $ble_connected) {
            if ($runMode === 0 || $runMode === 1) {
                $runMode = 1;
                if (lahan == 0) {
                    if ($siram_status) {
                        lahanSts = "1";
                        $lahan1_status = true;
                        $lahan2_status = true;
                        $lahan3_status = true;
                        $lahan4_status = true;
                    } else {
                        lahanSts = "0";
                        $lahan1_status = false;
                        $lahan2_status = false;
                        $lahan3_status = false;
                        $lahan4_status = false;
                    }
                } else if (lahan == 1) {
                    if ($lahan1_status) {
                        lahanSts = "1";
                        $siram_status = true;
                    } else {
                        lahanSts = "0";
                        if (
                            !$lahan2_status &&
                            !$lahan3_status &&
                            !$lahan4_status
                        ) {
                            $siram_status = false;
                        }
                    }
                } else if (lahan == 2) {
                    if ($lahan2_status) {
                        lahanSts = "1";
                        $siram_status = true;
                    } else {
                        lahanSts = "0";
                        if (
                            !$lahan1_status &&
                            !$lahan3_status &&
                            !$lahan4_status
                        ) {
                            $siram_status = false;
                        }
                    }
                } else if (lahan == 3) {
                    if ($lahan3_status) {
                        lahanSts = "1";
                        $siram_status = true;
                    } else {
                        lahanSts = "0";
                        if (
                            !$lahan2_status &&
                            !$lahan1_status &&
                            !$lahan4_status
                        ) {
                            $siram_status = false;
                        }
                    }
                } else if (lahan == 4) {
                    if ($lahan4_status) {
                        lahanSts = "1";
                        $siram_status = true;
                    } else {
                        lahanSts = "0";
                        if (
                            !$lahan2_status &&
                            !$lahan3_status &&
                            !$lahan1_status
                        ) {
                            $siram_status = false;
                        }
                    }
                }

                //console.log('siram lahan ' + lahan + '=> ' + lahanSts + '(1=ON,0=OFF)');
                if (!$demoMode) {
                    kirimMsg("siram", lahan, "cmd", lahanSts);
                } else {
                    alertDemo();
                    $lahan1_status = false;
                    $lahan2_status = false;
                    $lahan3_status = false;
                    $lahan4_status = false;
                    $siram_status = false;
                }
            } else {
                //
                $lahan1_status = false;
                $lahan2_status = false;
                $lahan3_status = false;
                $lahan4_status = false;
                $siram_status = false;

                alertShow($runMode);
            }
        } else {
            alertConect();
            $lahan1_status = false;
            $lahan2_status = false;
            $lahan3_status = false;
            $lahan4_status = false;
            $siram_status = false;
        }
    }

    function alertDemo() {
        showModal = true;
        showMode = 3;
        alertType = 1;
        timeOut = 2;
    }
    function alertConect() {
        showModal = true;
        showMode = 3;
        alertType = 2;
        timeOut = 2;
    }
    function alertLahan() {
        showModal = true;
        showMode = 3;
        alertType = 3;
        timeOut = 2;
    }
    function alertHari() {
        showModal = true;
        showMode = 3;
        alertType = 4;
        timeOut = 2;
    }
    function alertSimpanJadwal() {
        showModal = true;
        showMode = 3;
        alertType = 5;
        timeOut = 2;
    }

    function alertShow(val) {
        showModal = true;
        showMode = val;
        alertType = 0;
        timeOut = 2;
    }

    function lahan1Click(idx) {
        if (cekLahan1[idx]) {
            pilihanLahan1[idx] = 1;
        } else {
            pilihanLahan1[idx] = 0;
        }
        //console.log(pilihanLahan1)
    }

    function lahan2Click(idx) {
        if (cekLahan2[idx]) {
            pilihanLahan2[idx] = 1;
        } else {
            pilihanLahan2[idx] = 0;
        }
        //console.log(pilihanLahan1)
    }

    function lahan3Click(idx) {
        if (cekLahan3[idx]) {
            pilihanLahan3[idx] = 1;
        } else {
            pilihanLahan3[idx] = 0;
        }
        //console.log(pilihanLahan1)
    }

    function lahan4Click(idx) {
        if (cekLahan4[idx]) {
            pilihanLahan4[idx] = 1;
        } else {
            pilihanLahan4[idx] = 0;
        }
        //console.log(pilihanLahan1)
    }
    function lahan5Click(idx) {
        if (cekLahan5[idx]) {
            pilihanLahan5[idx] = 1;
        } else {
            pilihanLahan5[idx] = 0;
        }
        //console.log(pilihanLahan1)
    }
    function pilihanHari1Click(idx) {
        if (cekHari1[idx]) {
            pilihanHari1[idx] = 1;
        } else {
            pilihanHari1[idx] = 0;
        }
    }
    function pilihanHari2Click(idx) {
        if (cekHari2[idx]) {
            pilihanHari2[idx] = 1;
        } else {
            pilihanHari2[idx] = 0;
        }
    }

    function pilihanHari3Click(idx) {
        if (cekHari3[idx]) {
            pilihanHari3[idx] = 1;
        } else {
            pilihanHari3[idx] = 0;
        }
    }

    function pilihanHari4Click(idx) {
        if (cekHari4[idx]) {
            pilihanHari4[idx] = 1;
        } else {
            pilihanHari4[idx] = 0;
        }
    }

    function pilihanHari5Click(idx) {
        if (cekHari5[idx]) {
            pilihanHari5[idx] = 1;
        } else {
            pilihanHari5[idx] = 0;
        }
    }

    function trigerLengasChange() {
        //console.log('triger lengas: ' + $ambangLengas);
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg("siram", "0", "setAmbang", String($ambangLengas));
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }
    function packingJadwal() {
        //format
        //enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T
        let jw = "";
        if (jadwal1Enable) {
            jw += "1";
        } else {
            jw += "0";
        }
        jw += ",1,0,"; //kode 0 siram
        let wt = waktuSiram1.split(":");
        jw += wt[0];
        jw += ",";
        jw += wt[1];
        jw += ",";
        for (let i = 0; i < 7; i++) {
            jw += String(pilihanHari1[i]);
            jw += ",";
        }

        for (let i = 0; i < 4; i++) {
            jw += String(pilihanLahan1[i]);
            jw += ",";
        }
        jw += "0,0,";
        jw += String(durasiSiram1);
        jw += ";";

        //jadwal 2
        if (jadwal2Enable) {
            jw += "1";
        } else {
            jw += "0";
        }
        jw += ",2,0,"; //kode 0 siram
        wt = waktuSiram2.split(":");
        jw += wt[0];
        jw += ",";
        jw += wt[1];
        jw += ",";
        for (let i = 0; i < 7; i++) {
            jw += String(pilihanHari2[i]);
            jw += ",";
        }

        for (let i = 0; i < 4; i++) {
            jw += String(pilihanLahan2[i]);
            jw += ",";
        }
        jw += "0,0,";
        jw += String(durasiSiram2);
        jw += ";";

        //jadwal 3
        if (jadwal3Enable) {
            jw += "1";
        } else {
            jw += "0";
        }
        jw += ",3,0,"; //kode 0 siram
        wt = waktuSiram3.split(":");
        jw += wt[0];
        jw += ",";
        jw += wt[1];
        jw += ",";
        for (let i = 0; i < 7; i++) {
            jw += String(pilihanHari3[i]);
            jw += ",";
        }

        for (let i = 0; i < 4; i++) {
            jw += String(pilihanLahan3[i]);
            jw += ",";
        }
        jw += "0,0,";
        jw += String(durasiSiram3);
        jw += ";";

        //jadwal 4
        if (jadwal4Enable) {
            jw += "1";
        } else {
            jw += "0";
        }
        jw += ",4,0,"; //kode 0 siram
        wt = waktuSiram4.split(":");
        jw += wt[0];
        jw += ",";
        jw += wt[1];
        jw += ",";
        for (let i = 0; i < 7; i++) {
            jw += String(pilihanHari4[i]);
            jw += ",";
        }

        for (let i = 0; i < 4; i++) {
            jw += String(pilihanLahan4[i]);
            jw += ",";
        }
        jw += "0,0,";
        jw += String(durasiSiram4);
        jw += ";";

        //jadwal 5
        if (jadwal5Enable) {
            jw += "1";
        } else {
            jw += "0";
        }
        jw += ",5,0,"; //kode 0 siram
        wt = waktuSiram5.split(":");
        jw += wt[0];
        jw += ",";
        jw += wt[1];
        jw += ",";
        for (let i = 0; i < 7; i++) {
            jw += String(pilihanHari5[i]);
            jw += ",";
        }

        for (let i = 0; i < 4; i++) {
            jw += String(pilihanLahan5[i]);
            jw += ",";
        }
        jw += "0,0,";
        jw += String(durasiSiram5);
        jw += ";";

        return jw;
    }

    function simpanJadwalSiram() {
        let simpan = false;
        if ($demoMode) {
            alertDemo();
        } else if (!$conect_status) {
            alertConect();
            jadwal1Enable = false;
            jadwal2Enable = false;
            jadwal3Enable = false;
            jadwal4Enable = false;
            jadwal5Enable = false;
        } else {
            if (showjadwal === 1) {
                if (
                    !cekLahan1[0] &&
                    !cekLahan1[1] &&
                    !cekLahan1[2] &&
                    !cekLahan1[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari1[0] &&
                    !cekHari1[1] &&
                    !cekHari1[2] &&
                    !cekHari1[3] &&
                    !cekHari1[4] &&
                    !cekHari1[5] &&
                    !cekHari1[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 2) {
                if (
                    !cekLahan2[0] &&
                    !cekLahan2[1] &&
                    !cekLahan2[2] &&
                    !cekLahan2[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari2[0] &&
                    !cekHari2[1] &&
                    !cekHari2[2] &&
                    !cekHari2[3] &&
                    !cekHari2[4] &&
                    !cekHari2[5] &&
                    !cekHari2[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 3) {
                if (
                    !cekLahan3[0] &&
                    !cekLahan3[1] &&
                    !cekLahan3[2] &&
                    !cekLahan3[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari3[0] &&
                    !cekHari3[1] &&
                    !cekHari3[2] &&
                    !cekHari3[3] &&
                    !cekHari3[4] &&
                    !cekHari3[5] &&
                    !cekHari3[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 4) {
                if (
                    !cekLahan4[0] &&
                    !cekLahan4[1] &&
                    !cekLahan4[2] &&
                    !cekLahan4[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari4[0] &&
                    !cekHari4[1] &&
                    !cekHari4[2] &&
                    !cekHari4[3] &&
                    !cekHari4[4] &&
                    !cekHari4[5] &&
                    !cekHari4[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 5) {
                if (
                    !cekLahan5[0] &&
                    !cekLahan5[1] &&
                    !cekLahan5[2] &&
                    !cekLahan5[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari5[0] &&
                    !cekHari5[1] &&
                    !cekHari5[2] &&
                    !cekHari5[3] &&
                    !cekHari5[4] &&
                    !cekHari5[5] &&
                    !cekHari5[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            }
            if (simpan) {
                alertSimpanJadwal();
                showMode = 1;
                showjadwal = 0;
                let jwl = packingJadwal();
                //console.log(jwl);
                kirimMsg("siram", 0, "setJadwal", jwl);
            }
        }
    }

    function loadJadwal(page) {
        //format
        //enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T;enable,idx,jenis,H,M,s,s,r,k,j,s,m,l1,l2,l3,l4,A,P,T
        let jadwal123;
        if (page === "siram") {
            jadwal123 = $jadwalSiram.split(";");
        } else if (page === "pestisida") {
            jadwal123 = $jadwalPestisida.split(";");
        } else if (page === "biopest") {
            jadwal123 = $jadwalBiopest.split(";");
        }
        //jadwal1
        let jadwal1 = jadwal123[0].split(",");
        if (jadwal1[0] === "1") {
            jadwal1Enable = true;
        } else {
            jadwal1Enable = false;
        }
        if (page === "siram") {
            waktuSiram1 = jadwal1[3] + ":";
            waktuSiram1 += jadwal1[4];
        } else {
            waktuSemprot1 = jadwal1[3] + ":";
            waktuSemprot1 += jadwal1[4];
        }

        for (let i = 0; i < 7; i++) {
            if (jadwal1[5 + i] === "1") {
                cekHari1[i] = true;
                pilihanHari1[i] = 1;
            } else {
                cekHari1[i] = false;
                pilihanHari1[i] = 0;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (jadwal1[12 + i] === "1") {
                cekLahan1[i] = true;
                pilihanLahan1[i] = 1;
            } else {
                cekLahan1[i] = false;
                pilihanLahan1[i] = 0;
            }
        }
        if (page === "siram") {
            durasiSiram1 = parseInt(jadwal1[18]);
        } else if (page === "pestisida") {
            dosisAirPestisida1 = parseInt(jadwal1[16]);
            dosisPestisida1 = parseInt(jadwal1[17]);
        } else if (page === "biopest") {
            dosisAirBiopest1 = parseInt(jadwal1[16]);
            dosisBiopest1 = parseInt(jadwal1[17]);
        }
        //jadwal2
        let jadwal2 = jadwal123[1].split(",");
        if (jadwal2[0] === "1") {
            jadwal2Enable = true;
        } else {
            jadwal2Enable = false;
        }
        if (page === "siram") {
            waktuSiram2 = jadwal2[3] + ":";
            waktuSiram2 += jadwal2[4];
        } else {
            waktuSemprot2 = jadwal2[3] + ":";
            waktuSemprot2 += jadwal2[4];
        }
        for (let i = 0; i < 7; i++) {
            if (jadwal2[5 + i] === "1") {
                cekHari2[i] = true;
                pilihanHari2[i] = 1;
            } else {
                cekHari2[i] = false;
                pilihanHari2[i] = 0;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (jadwal2[12 + i] === "1") {
                cekLahan2[i] = true;
                pilihanLahan2[i] = 1;
            } else {
                cekLahan2[i] = false;
                pilihanLahan2[i] = 0;
            }
        }
        if (page === "siram") {
            durasiSiram2 = parseInt(jadwal2[18]);
        } else if (page === "pestisida") {
            dosisAirPestisida2 = parseInt(jadwal2[16]);
            dosisPestisida2 = parseInt(jadwal2[17]);
        } else if (page === "biopest") {
            dosisAirBiopest2 = parseInt(jadwal2[16]);
            dosisBiopest2 = parseInt(jadwal2[17]);
        }
        //jadwal3
        let jadwal3 = jadwal123[2].split(",");
        if (jadwal3[0] === "1") {
            jadwal3Enable = true;
        } else {
            jadwal3Enable = false;
        }
        if (page === "siram") {
            waktuSiram3 = jadwal3[3] + ":";
            waktuSiram3 += jadwal3[4];
        } else {
            waktuSemprot3 = jadwal3[3] + ":";
            waktuSemprot3 += jadwal3[4];
        }
        for (let i = 0; i < 7; i++) {
            if (jadwal3[5 + i] === "1") {
                cekHari3[i] = true;
                pilihanHari3[i] = 1;
            } else {
                cekHari3[i] = false;
                pilihanHari3[i] = 0;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (jadwal3[12 + i] === "1") {
                cekLahan3[i] = true;
                pilihanLahan3[i] = 1;
            } else {
                cekLahan3[i] = false;
                pilihanLahan3[i] = 0;
            }
        }
        if (page === "siram") {
            durasiSiram3 = parseInt(jadwal3[18]);
        } else if (page === "pestisida") {
            dosisAirPestisida3 = parseInt(jadwal3[16]);
            dosisPestisida3 = parseInt(jadwal3[17]);
        } else if (page === "biopest") {
            dosisAirBiopest3 = parseInt(jadwal3[16]);
            dosisBiopest3 = parseInt(jadwal3[17]);
        }
        //jadwal4
        let jadwal4 = jadwal123[3].split(",");
        if (jadwal4[0] === "1") {
            jadwal4Enable = true;
        } else {
            jadwal4Enable = false;
        }
        if (page === "siram") {
            waktuSiram4 = jadwal4[3] + ":";
            waktuSiram4 += jadwal4[4];
        } else {
            waktuSemprot4 = jadwal4[3] + ":";
            waktuSemprot4 += jadwal4[4];
        }
        for (let i = 0; i < 7; i++) {
            if (jadwal4[5 + i] === "1") {
                cekHari4[i] = true;
                pilihanHari4[i] = 1;
            } else {
                cekHari4[i] = false;
                pilihanHari4[i] = 0;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (jadwal4[12 + i] === "1") {
                cekLahan4[i] = true;
                pilihanLahan4[i] = 1;
            } else {
                cekLahan4[i] = false;
                pilihanLahan4[i] = 0;
            }
        }
        if (page === "siram") {
            durasiSiram4 = parseInt(jadwal1[18]);
        } else if (page === "pestisida") {
            dosisAirPestisida4 = parseInt(jadwal4[16]);
            dosisPestisida4 = parseInt(jadwal4[17]);
        } else if (page === "biopest") {
            dosisAirBiopest4 = parseInt(jadwal4[16]);
            dosisBiopest4 = parseInt(jadwal4[17]);
        }
        //jadwal5
        let jadwal5 = jadwal123[4].split(",");
        if (jadwal5[0] === "1") {
            jadwal5Enable = true;
        } else {
            jadwal5Enable = false;
        }
        if (page === "siram") {
            waktuSiram5 = jadwal5[3] + ":";
            waktuSiram5 += jadwal5[4];
        } else {
            waktuSemprot5 = jadwal5[3] + ":";
            waktuSemprot5 += jadwal5[4];
        }
        for (let i = 0; i < 7; i++) {
            if (jadwal5[5 + i] === "1") {
                cekHari5[i] = true;
                pilihanHari5[i] = 1;
            } else {
                cekHari5[i] = false;
                pilihanHari5[i] = 0;
            }
        }
        for (let i = 0; i < 4; i++) {
            if (jadwal5[12 + i] === "1") {
                cekLahan5[i] = true;
                pilihanLahan5[i] = 1;
            } else {
                cekLahan5[i] = false;
                pilihanLahan5[i] = 0;
            }
        }
        if (page === "siram") {
            durasiSiram5 = parseInt(jadwal5[18]);
        } else if (page === "pestisida") {
            dosisAirPestisida5 = parseInt(jadwal5[16]);
            dosisPestisida5 = parseInt(jadwal5[17]);
        } else if (page === "biopest") {
            dosisAirBiopest5 = parseInt(jadwal5[16]);
            dosisBiopest5 = parseInt(jadwal5[17]);
        }

        if (page === "siram") {
            waktuSiram1 = waktuSiram1;
            waktuSiram2 = waktuSiram2;
            waktuSiram3 = waktuSiram3;
            waktuSiram4 = waktuSiram4;
            waktuSiram5 = waktuSiram5;
        } else {
            waktuSemprot1 = waktuSemprot1;
            waktuSemprot2 = waktuSemprot2;
            waktuSemprot3 = waktuSemprot3;
            waktuSemprot4 = waktuSemprot4;
            waktuSemprot5 = waktuSemprot5;
        }
    }

    function showJadwalSiram() {
        showModal = true;
        showMode = 1;
        if ($newJadwalSiram) {
            loadJadwal("siram");
            newJadwalSiram.set(false);
            //
        }
    }

    function setDurasiClick() {
        showModal = true;
        showMode = 2;
        timeOut = 0;
    }

    function simpanDurasi() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg("siram", 0, "setDurasi", String($durasiManual));
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function jadwalClick(jadwal = 1) {
        showModal = true;
        showMode = 1;
        showjadwal = jadwal;
        timeOut = 0;
    }

    function jadwalAktif(jadwal) {
        if ($demoMode) {
            alertDemo();
            switch (jadwal) {
                case 1:
                    jadwal1Enable = false;
                    break;
                case 2:
                    jadwal2Enable = false;
                    break;
                case 3:
                    jadwal3Enable = false;
                    break;
                case 4:
                    jadwal4Enable = false;
                    break;
                case 5:
                    jadwal5Enable = false;
                    break;
            }
        }
    }
    $: if ($newJadwalSiram == true) {
        loadJadwalSiram();
        newJadwalSiram.set(false);
    }

    //================pestisida================
    function getJadwalPestisida() {
        kirimMsg("pestisida", 0, "getJadwal", 0);
        setTimeout(loadJadwalPestisida, 1000);
    }
    function loadJadwalPestisida() {
        if ($jadwalPestisida.length >= 200) {
            loadJadwal("pestisida");
        } else {
            //default Jadwal
            console.log("load default jadwal");
            let jw =
                "0,1,0,07,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;0,2,0,11,30,1,1,1,1,1,1,1,1,1,1,1,0,0,3;0,3,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;0,2,0,11,30,1,1,1,1,1,1,1,1,1,1,1,0,0,3;0,3,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;";
            $jadwalPestisida = jw;
            loadJadwal("pestisida");
        }
    }

    function semprotPestisida(lahan) {
        let msg = "0";
        if ($conect_status || $ble_connected) {
            if ($runMode === 0 || $runMode === 2) {
                runMode.set(2);
                if (lahan === 0) {
                    if ($pestisida_status) {
                        msg = "1";

                        $lahan1Pestisida_status = true;
                        $lahan2Pestisida_status = true;
                        $lahan3Pestisida_status = true;
                        $lahan4Pestisida_status = true;
                    } else {
                        msg = "0";
                        $lahan1Pestisida_status = false;
                        $lahan2Pestisida_status = false;
                        $lahan3Pestisida_status = false;
                        $lahan4Pestisida_status = false;
                    }
                } else if (lahan === 1) {
                    if ($lahan1Pestisida_status) {
                        msg = "1";
                        $pestisida_status = true;
                    } else {
                        msg = "0";
                    }
                } else if (lahan === 2) {
                    if ($lahan2Pestisida_status) {
                        msg = "1";
                        $pestisida_status = true;
                    } else {
                        msg = "0";
                    }
                } else if (lahan === 3) {
                    if ($lahan3Pestisida_status) {
                        msg = "1";
                        $pestisida_status = true;
                    } else {
                        msg = "0";
                    }
                } else if (lahan === 4) {
                    if ($lahan4Pestisida_status) {
                        msg = "1";
                        $pestisida_status = true;
                    } else {
                        msg = "0";
                    }
                }
                //if (readySend) {
                if (!$demoMode) kirimMsg("pestisida", lahan, "cmd", msg);
                else {
                    alertDemo();
                    $lahan1Pestisida_status = false;
                    $lahan2Pestisida_status = false;
                    $lahan3Pestisida_status = false;
                    $lahan4Pestisida_status = false;
                    $pestisida_status = false;
                }
            } else {
                //
                $lahan1Pestisida_status = false;
                $lahan2Pestisida_status = false;
                $lahan3Pestisida_status = false;
                $lahan4Pestisida_status = false;
                $pestisida_status = false;
                alertShow($runMode);
            }
        } else {
            alertConect();
            $lahan1Pestisida_status = false;
            $lahan2Pestisida_status = false;
            $lahan3Pestisida_status = false;
            $lahan4Pestisida_status = false;
            $pestisida_status = false;
        }
    }

    function simpanDosisAirPestisida() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "setDosisAirPestisida",
                    String($dosisAirPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }
    function simpanDosisPestisida() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "setDosisPestisida",
                    String($dosisPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    //================biopes==================
    function loadJadwalBiopest() {
        if ($jadwalBiopest.length >= 200) {
            loadJadwal("biopest");
        } else {
            //default Jadwal
            console.log("load default jadwal");
            let jw =
                "0,1,0,07,00,1,1,1,1,1,1,1,1,1,1,1,02,04,5;0,2,0,11,30,1,1,1,1,1,1,1,1,1,1,1,03,10,3;0,3,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;0,4,0,11,30,1,1,1,1,1,1,1,1,1,1,1,0,0,3;0,5,0,16,00,1,1,1,1,1,1,1,1,1,1,1,0,0,5;";
            $jadwalBiopest = jw;
            loadJadwal("biopest");
        }
    }

    function semprotBiopest(lahan) {
        let msg = "0";
        if ($conect_status || $ble_connected) {
            if ($runMode === 0 || $runMode === 3) {
                runMode.set(3);
                if (lahan === 0) {
                    if ($biopest_status) {
                        msg = "1";

                        $lahan1Biopest_status = true;
                        $lahan2Biopest_status = true;
                        $lahan3Biopest_status = true;
                        $lahan4Biopest_status = true;
                    } else {
                        msg = "0";
                        $lahan1Biopest_status = false;
                        $lahan2Biopest_status = false;
                        $lahan3Biopest_status = false;
                        $lahan4Biopest_status = false;
                    }
                } else if (lahan === 1) {
                    if ($lahan1Biopest_status) {
                        msg = "1";
                        $biopest_status = true;
                    } else {
                        msg = "0";
                        if (
                            !$lahan2Biopest_status &&
                            !$lahan3Biopest_status &&
                            !$lahan4Biopest_status
                        ) {
                            $biopest_status = false;
                        }
                    }
                } else if (lahan === 2) {
                    if ($lahan2Biopest_status) {
                        msg = "1";
                        $biopest_status = true;
                    } else {
                        msg = "0";
                        if (
                            !$lahan1Biopest_status &&
                            !$lahan3Biopest_status &&
                            !$lahan4Biopest_status
                        ) {
                            $biopest_status = false;
                        }
                    }
                } else if (lahan === 3) {
                    if ($lahan3Biopest_status) {
                        msg = "1";
                        $biopest_status = true;
                    } else {
                        msg = "0";
                        if (
                            !$lahan2Biopest_status &&
                            !$lahan1Biopest_status &&
                            !$lahan4Biopest_status
                        ) {
                            $biopest_status = false;
                        }
                    }
                } else if (lahan === 4) {
                    if ($lahan4Biopest_status) {
                        msg = "1";
                        $biopest_status = true;
                    } else {
                        msg = "0";
                        if (
                            !$lahan2Biopest_status &&
                            !$lahan3Biopest_status &&
                            !$lahan1Biopest_status
                        ) {
                            $biopest_status = false;
                        }
                    }
                }
                //if (readySend) {
                if (!$demoMode) {
                    kirimMsg("biopest", lahan, "cmd", msg);
                } else {
                    alertDemo();
                    $lahan1Biopest_status = false;
                    $lahan2Biopest_status = false;
                    $lahan3Biopest_status = false;
                    $lahan4Biopest_status = false;
                    $biopest_status = false;
                }
            } else {
                //
                $lahan1Biopest_status = false;
                $lahan2Biopest_status = false;
                $lahan3Biopest_status = false;
                $lahan4Biopest_status = false;
                $biopest_status = false;
                alertShow($runMode);
            }
        } else {
            alertConect();
            $lahan1Biopest_status = false;
            $lahan2Biopest_status = false;
            $lahan3Biopest_status = false;
            $lahan4Biopest_status = false;
            $biopest_status = false;
        }
    }
    function simpanDosisAirBiopest() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "biopest",
                    0,
                    "setDosisAirBiopest",
                    String($dosisAirBiopest),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }
    function simpanDosisBiopest() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "biopest",
                    0,
                    "setDosisBiopest",
                    String($dosisBiopest),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }
    function simpanJadwalBiopest(idxJadwal) {
        let simpan = false;
        if ($demoMode) {
            alertDemo();
        } else if (!$conect_status) {
            alertConect();
            jadwal1Enable = false;
            jadwal2Enable = false;
            jadwal3Enable = false;
            jadwal4Enable = false;
            jadwal5Enable = false;
        } else {
            if (showjadwal === 1) {
                if (
                    !cekLahan1[0] &&
                    !cekLahan1[1] &&
                    !cekLahan1[2] &&
                    !cekLahan1[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari1[0] &&
                    !cekHari1[1] &&
                    !cekHari1[2] &&
                    !cekHari1[3] &&
                    !cekHari1[4] &&
                    !cekHari1[5] &&
                    !cekHari1[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 2) {
                if (
                    !cekLahan2[0] &&
                    !cekLahan2[1] &&
                    !cekLahan2[2] &&
                    !cekLahan2[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari2[0] &&
                    !cekHari2[1] &&
                    !cekHari2[2] &&
                    !cekHari2[3] &&
                    !cekHari2[4] &&
                    !cekHari2[5] &&
                    !cekHari2[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 3) {
                if (
                    !cekLahan3[0] &&
                    !cekLahan3[1] &&
                    !cekLahan3[2] &&
                    !cekLahan3[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari3[0] &&
                    !cekHari3[1] &&
                    !cekHari3[2] &&
                    !cekHari3[3] &&
                    !cekHari3[4] &&
                    !cekHari3[5] &&
                    !cekHari3[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 4) {
                if (
                    !cekLahan4[0] &&
                    !cekLahan4[1] &&
                    !cekLahan4[2] &&
                    !cekLahan4[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari4[0] &&
                    !cekHari4[1] &&
                    !cekHari4[2] &&
                    !cekHari4[3] &&
                    !cekHari4[4] &&
                    !cekHari4[5] &&
                    !cekHari4[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            } else if (showjadwal === 5) {
                if (
                    !cekLahan5[0] &&
                    !cekLahan5[1] &&
                    !cekLahan5[2] &&
                    !cekLahan5[3]
                ) {
                    alertLahan();
                } else if (
                    !cekHari5[0] &&
                    !cekHari5[1] &&
                    !cekHari5[2] &&
                    !cekHari5[3] &&
                    !cekHari5[4] &&
                    !cekHari5[5] &&
                    !cekHari5[6]
                ) {
                    alertHari();
                } else {
                    simpan = true;
                }
            }
            if (simpan) {
                alertSimpanJadwal();
                //showMode = 1;
                //showjadwal = 0;
                let jwl = packingJadwal();
                //console.log(jwl);
                kirimMsg("biopest", 0, "setJadwal", jwl);
            }
        }
    }

    $: if ($newJadwalBiopest == true) {
        loadJadwalBiopest();
        newJadwalBiopest.set(false);
    }
    //=================setup====================
    function getKalibrasiPestisida() {
        kirimMsg("pestisida", 0, "getKalibrasi", "1");
    }

    function getKalibrasiBiopest() {
        kirimMsg("biopest", 0, "getKalibrasi", "1");
    }

    function selenoidLahan(lahan, val) {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                if (val) {
                    kirimMsg("selenoid", lahan, "lahan", "1");
                } else {
                    kirimMsg("selenoid", lahan, "lahan", "0");
                }
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanId() {
        if (kontrolId_value === "") {
            alert("kontrolId tidak boleh kosong");
        } else {
            kontrolIDStore.set(kontrolId_value);
            alert("kontrolID " + kontrolId_value + " disimpan");
        }
    }

    function simpanBroker() {
        if (brokerUse_value === "Server 1") {
            brokerUseStore.set("ws://mqtt.eclipseprojects.io/mqtt");
            brokerPortUseStore.set("80");
        } else if (brokerUse_value === "Server 2") {
            brokerUseStore.set("wss://mqtt.eclipseprojects.io/mqtt");
            brokerPortUseStore.set("443");
        } else if (brokerUse_value === "Server 3") {
            brokerUseStore.set("ws://broker.hivemq.com/");
            brokerPortUseStore.set("8000");
        }

        /*
		if (brokerUse_value === '') {
			alert('Server tidak boleh kosong\n');
		} else {
			brokerUseStore.set(brokerUse_value);
			brokerPortUseStore.set(brokerPortUse_value);
			let brokerMsg = brokerUse_value + '~' + brokerPortUse_value;
			kirimMsg('kontrol', 0, 'setupBroker', brokerMsg);
			alert('Server ' + brokerUse_value + 'port: ' + brokerPortUse_value + ' disimpan');
		}
		*/
    }

    function pageClick(page) {
        pageNow = page;
        getAllStatus(page);
    }

    function simpanWifi() {
        if (wifiSSID_value === "") {
            alert("SSID tidak boleh kosong\n");
        } else {
            let wifiMsg = wifiSSID_value + "~" + wifiPassword_value;
            kirimMsg("kontrol", 0, "setupWifi", wifiMsg);
            alert(
                "Wifi " +
                    wifiSSID_value +
                    "port: " +
                    wifiPassword_value +
                    " disimpan",
            );
        }
    }

    function pompaTes(val) {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                if (val === 1) {
                    if (pompaUtama_sts) {
                        //pompa utama
                        kirimMsg("pompa", val, "utama", "1");
                    } else {
                        kirimMsg("pompa", val, "utama", "0");
                    }
                } else if (val === 2) {
                    //pompa semprot
                    if (pompaSemprot_sts) {
                        kirimMsg("pompa", val, "semprot", "1");
                    } else {
                        kirimMsg("pompa", val, "semprot", "0");
                    }
                } else if (val === 3) {
                    //pompa pestisida
                    if (pompaPestisida_sts) {
                        kirimMsg("pompa", val, "pestisida", "1");
                    } else {
                        kirimMsg("pompa", val, "pestisida", "0");
                    }
                } else if (val === 4) {
                    if (pompaAdukPestisida_sts) {
                        kirimMsg("pompa", val, "adukPestisida", "1");
                    } else {
                        kirimMsg("pompa", val, "adukPestisida", "0");
                    }
                } else if (val === 5) {
                    if (pompaBiopest_sts) {
                        kirimMsg("pompa", val, "biopest", "1");
                    } else {
                        kirimMsg("pompa", val, "biopest", "0");
                    }
                } else if (val === 6) {
                    if (pompaAdukBiopest_sts) {
                        kirimMsg("pompa", val, "adukBiopest", "1");
                    } else {
                        kirimMsg("pompa", val, "adukBiopest", "0");
                    }
                }
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function selenoidTes(val) {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                switch (val) {
                    case 1:
                        if (selenoidInletPestisida_sts) {
                            kirimMsg("selenoid", 0, "inletPestisida", "1");
                        } else {
                            kirimMsg("selenoid", 0, "inletPestisida", "0");
                        }
                        break;

                    case 2:
                        if (selenoidOutletPestisida_sts) {
                            kirimMsg("selenoid", 0, "outletPestisida", "1");
                        } else {
                            kirimMsg("selenoid", 0, "outletPestisida", "0");
                        }
                        break;

                    case 3:
                        if (selenoidInletBiopest_sts) {
                            kirimMsg("selenoid", 0, "inletBiopest", "1");
                        } else {
                            kirimMsg("selenoid", 0, "inletBiopest", "0");
                        }
                        break;

                    case 4:
                        if (selenoidOutletBiopest_sts) {
                            kirimMsg("selenoid", 0, "outletBiopest", "1");
                        } else {
                            kirimMsg("selenoid", 0, "outletBiopest", "0");
                        }
                        break;
                }
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function kalibrasiPestisida_start() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "kalibrasi",
                    String($kalibrasiPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function kalibrasiAirPestisida_start() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "kalibrasiAir",
                    String($kalibrasiAirPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanKalibrasi_pestisida() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "simpanKalibrasi",
                    String($kalibrasiPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanKalibrasiAir_pestisida() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "pestisida",
                    0,
                    "simpanKalibrasiAir",
                    String($kalibrasiAirPestisida),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function kalibrasiBiopest_start() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg("biopest", 0, "kalibrasi", String($kalibrasiBiopest));
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function kalibrasiAirBiopest_start() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "biopest",
                    0,
                    "kalibrasiAir",
                    String($kalibrasiAirBiopest),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanKalibrasi_biopest() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "biopest",
                    0,
                    "simpanKalibrasi",
                    String($kalibrasiBiopest),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanKalibrasiAir_biopest() {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                kirimMsg(
                    "biopest",
                    0,
                    "simpanKalibrasiAir",
                    String($kalibrasiAirBiopest),
                );
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function kalibrasiLengas_start(lengas) {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                switch (lengas) {
                    case 1:
                        if (kal_lengas1) {
                            //kirimMsg('lengas', 1, 'setInterval', '1');
                            kirimMsg("lengas", 1, "setInterval", "1");
                        } else {
                            kirimMsg("lengas", 1, "setInterval", "60");
                        }

                        break;

                    case 2:
                        if (kal_lengas2) {
                            //kirimMsg('lengas', 1, 'setInterval', '1');
                            kirimMsg("lengas", 2, "setInterval", "1");
                        } else {
                            kirimMsg("lengas", 2, "setInterval", "60");
                        }

                        break;

                    case 3:
                        if (kal_lengas3) {
                            //kirimMsg('lengas', 1, 'setInterval', '1');
                            kirimMsg("lengas", 3, "setInterval", "1");
                        } else {
                            kirimMsg("lengas", 3, "setInterval", "60");
                        }

                        break;

                    case 4:
                        if (kal_lengas4) {
                            //kirimMsg('lengas', 1, 'setInterval', '1');
                            kirimMsg("lengas", 4, "setInterval", "1");
                        } else {
                            kirimMsg("lengas", 4, "setInterval", "60");
                        }

                        break;
                }
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    function simpanKalibrasiLengas(lengas) {
        if (!$demoMode) {
            if ($conect_status || $ble_connected) {
                switch (lengas) {
                    case 1:
                        kirimMsg("lengas", 1, "set100", String(set100_1));
                        setTimeout(() => {
                            kirimMsg("lengas", 1, "set0", String(set0_1));
                        }, 1000);

                        break;

                    case 2:
                        kirimMsg("lengas", 2, "set100", String(set100_2));
                        setTimeout(() => {
                            kirimMsg("lengas", 2, "set0", String(set0_2));
                        }, 1000);

                        break;

                    case 3:
                        kirimMsg("lengas", 3, "set100", String(set100_3));
                        setTimeout(() => {
                            kirimMsg("lengas", 3, "set0", String(set0_3));
                        }, 1000);

                        break;

                    case 4:
                        kirimMsg("lengas", 4, "set100", String(set100_4));
                        setTimeout(() => {
                            kirimMsg("lengas", 4, "set0", String(set0_4));
                        }, 1000);

                        break;
                }
            } else {
                alertConect();
            }
        } else {
            alertDemo();
        }
    }

    let responseMessage = "";

    async function handleSubmit() {
        const formData = new FormData();
        formData.append("fileToUpload", files[0]);
        formData.append("kontrolID", get(kontrolIDStore));

        try {
            const response = await fetch("/setup", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                //{type: 'success', status: 200, data: '[{"status":1,"success":2,"body":3},200,true,{"nama…ad/SP7652_firmware.bin","File berhasil disimpan"]'}
                const result = await response.json();
                const data = JSON.parse(result.data);
                //console.log(result.data[0])
                console.log(data[data[0].pesan]);
                console.log(data[data[0].path]);
            } else {
                responseMessage = "Gagal mengunggah file";
            }
        } catch (error) {
            console.error("Error:", error);
            responseMessage = "Terjadi kesalahan saat mengunggah file";
            console.log(responseMessage);
        }
    }

    function handleFileChange(event) {
        files = event.target.files;
    }

    //=======================================
</script>

<div class="h-screen w-screen bg-zinc-100">
    {#if pageNow === "login"}
        <div
            class="bg_login h-full w-full max-w-md mx-auto bg-zinc-500 flex flex-col"
        >
            <div class=" h-full w-full grid justify-items-center">
                <div class="w-full h-80 mb-8"></div>

                <div
                    class="w-3/4 h-32 bg-white rounded-lg mt-20 grid justify-items-center"
                >
                    <input
                        type="password"
                        placeholder="Tulis Passwordmu "
                        bind:value={myPassword}
                        class="input input-bordered input-secondary w-3/4 h-10 max-w-xs mt-4"
                    />
                    <div class="grid grid-cols-2 gap-4 py-2 w-3/4">
                        <button
                            on:click={() => startDemo()}
                            class="border border-purple-900 border rounded w-full h-10 mt-2"
                        >
                            DEMO</button
                        >

                        <button
                            on:click={() => startSiprosida()}
                            class="border border-purple-900 bg-purple-900 rounded w-full h-10 mt-2 text-white"
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
            <div class="text-xs w-full text-center mt-4">
                {get(kontrolIDStore)}
            </div>
        </div>
    {:else if pageNow === "siram"}
        <div
            class="bg_siram h-full w-full grid justify-items-center max-w-md mx-auto flex flex-col"
        >
            <div class="hd_siram1 w-full h-14">
                <div class="text-xs w-full text-center mt-14">
                    {get(kontrolIDStore)}
                </div>
                <div class="w-full h-4 grid justify-items-center mb-2">
                    {#if $demoMode}
                        <div
                            class="text-center text-xs bg-red-500 text-white w-12 h-4"
                        >
                            <small>Demo</small>
                        </div>
                    {:else if $ble_connected}
                        <div
                            class="text-center text-xs bg-blue-900 text-white w-12 h-4"
                        >
                            <small>Bluethoot</small>
                        </div>
                    {:else if $conect_status}
                        <div
                            class="text-center text-xs bg-green-500 text-white w-12 h-4"
                        >
                            <small>Online</small>
                        </div>
                    {:else}
                        <div
                            class="text-center text-xs bg-gray-700 text-white w-12 h-4"
                        >
                            <small>Offline</small>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="w-11/12 p-1 mt-2 grid justify-items-center">
                <!-- info lengas-->
                <div class="grid grid-cols-4 gap-2 w-full mt-4">
                    <div class="w-full rounded shadow-xl">
                        <div class="text-xs font-bold text-center">
                            <small>Lengas1</small>
                        </div>
                        <div class="text-xl font-bold text-center">
                            {$lengas1}%
                        </div>
                        <div class="text-xs text-center">
                            <small>lastUpdate</small>
                        </div>
                    </div>

                    <div class="w-full rounded shadow-xl">
                        <div class="text-xs font-bold text-center">
                            <small>Lengas2</small>
                        </div>
                        <div class="text-xl font-bold text-center">
                            {$lengas2}%
                        </div>
                        <div class="text-xs text-center">
                            <small>lastUpdate</small>
                        </div>
                    </div>

                    <div class="w-full rounded shadow-xl">
                        <div class="text-xs font-bold text-center">
                            <small>Lengas3</small>
                        </div>
                        <div class="text-xl font-bold text-center">
                            {$lengas3}%
                        </div>
                        <div class="text-xs text-center">
                            <small>lastUpdate</small>
                        </div>
                    </div>

                    <div class="w-full rounded shadow-xl">
                        <div class="text-xs font-bold text-center">
                            <small>Lengas4</small>
                        </div>
                        <div class="text-xl font-bold text-center">
                            {$lengas4}%
                        </div>
                        <div class="text-xs text-center">
                            <small>lastUpdate</small>
                        </div>
                    </div>
                </div>
                <!-- set lengas-->
                <div
                    class="w-full rounded border border-gray-400 shadow-lg p-2 mt-4 grid grid-cols-4"
                >
                    <div class="col-span-4 text-xs text-center font-bold my-2">
                        Otomatis Lengas
                    </div>
                    <input
                        type="range"
                        min="30"
                        max="100"
                        bind:value={$ambangLengas}
                        on:change={() => trigerLengasChange()}
                        class="range range-warning col-span-3"
                    />

                    <div class="font-bold text-xl text-center">
                        {$ambangLengas} %
                    </div>
                </div>
                <!-- jadwal -->
                <div class="grid grid-cols-5 gap-2 mt-4 h-10 w-full">
                    <button
                        class={jadwal1Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(1)}
                        ><div class="text-xs"><small>Jadwal1</small></div>
                        <div class="text-xs font-bold">{waktuSiram1}</div>
                    </button>
                    <button
                        class={jadwal2Enable
                            ? "border border-gray-700 shadow-lg rounded   bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(2)}
                        ><div class="text-xs"><small>Jadwal2</small></div>
                        <div class="text-xs font-bold">{waktuSiram2}</div>
                    </button>
                    <button
                        class={jadwal3Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(3)}
                        ><div class="text-xs"><small>Jadwal3</small></div>
                        <div class="text-xs font-bold">{waktuSiram3}</div>
                    </button>
                    <button
                        class={jadwal4Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(4)}
                        ><div class="text-xs"><small>Jadwal4</small></div>
                        <div class="text-xs font-bold">{waktuSiram4}</div>
                    </button>
                    <button
                        class={jadwal5Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(5)}
                        ><div class="text-xs"><small>Jadwal5</small></div>
                        <div class="text-xs font-bold">{waktuSiram5}</div>
                    </button>
                </div>

                <details class="dropdown w-full h-56">
                    <!--set dosis manual-->
                    <summary
                        class="text-xl mt-4 text-center bg-[#ff3300] text-white h-10 rounded-lg rounded-bl-none rounded-br-none border border-blue-950"
                        >Siram</summary
                    >
                    <div
                        class="w-full dropdown-content z-[1] bg-white rounded-lg rounded-tl-none rounded-tr-none shadow-lg border"
                    >
                        <!--pilih lahan-->
                        <div class="grid grid-cols-4 mt-4">
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2 ">
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan1</small
                                        >
                                        <input 
                                            type="checkbox"
                                            bind:checked={$lahan1_status}
                                            on:change={() => siramLahan(1)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan2</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan2_status}
                                            on:change={() => siramLahan(2)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan3</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan3_status}
                                            on:change={() => siramLahan(3)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan4</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan4_status}
                                            on:change={() => siramLahan(4)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    >
                                        <button
                                            on:click={() => setDurasiClick()}
                                            class="text-xs text-center text-white w-full h-6 mb-2 bg-gray-500 rounded-lg rounded-bl-none rounded-br-none"
                                            ><small
                                                >Durasi {$durasiManual} menit</small
                                            ></button
                                        >
                                        <div
                                            class="h-10 grid justify-items-center"
                                        >
                                            <div class="text-center text-xs">
                                                {$siramCount}
                                            </div>
                                            <div class="text-center text-xs">
                                                {$volumeAir}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    >
                                        <small class=" text-xs">Semua</small>
                                        <label class="swap h-12 w-12">
                                            <!-- this hidden checkbox controls the state -->
                                            <input
                                                type="checkbox"
                                                bind:checked={$siram_status}
                                                on:change={() => siramLahan(0)}
                                            />
                                            <div class="swap-on">
                                                <img
                                                    src="{base}/on4.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off">
                                                <img
                                                    src="{base}/off4.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    {:else if pageNow === "pestisida"}
        <div
            class="bg_pestisida h-full w-full grid justify-items-center max-w-md mx-auto flex flex-col"
        >
            <div class="hd_pestisida1 w-full h-16">
                <div class="text-xs w-full text-center mt-12">
                    {get(kontrolIDStore)}
                </div>
                <div class="w-full h-4 grid justify-items-center mb-2">
                    {#if $demoMode}
                        <div
                            class="text-center text-xs bg-red-500 text-white w-12 h-4"
                        >
                            <small>Demo</small>
                        </div>
                    {:else if $ble_connected}
                        <div
                            class="text-center text-xs bg-blue-900 text-white w-12 h-4"
                        >
                            <small>Bluethoot</small>
                        </div>
                    {:else if $conect_status}
                        <div
                            class="text-center text-xs bg-green-500 text-white w-12 h-4"
                        >
                            <small>Online</small>
                        </div>
                    {:else}
                        <div
                            class="text-center text-xs bg-gray-700 text-white w-12 h-4"
                        >
                            <small>Offline</small>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="w-11/12 p-1 mt-2 grid justify-items-center">
                <!--info-->
                <div
                    class="w-full mt-2 p-1 grid justify-items-center rounded-lg shadow-lg border border-gray-300"
                >
                    <div class="text-xs text-center">Total pestisida</div>
                    <div class="text-xl font-bold">
                        {$volumeAir} <small class="text-xs">liter</small>
                    </div>
                </div>

                <div class="grid grid-cols-5 gap-2 mt-4 h-10 w-full">
                    <button
                        class={jadwal1Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(1)}
                        ><div class="text-xs"><small>Jadwal1</small></div>
                        <div class="text-xs font-bold">{waktuSemprot1}</div>
                    </button>
                    <button
                        class={jadwal2Enable
                            ? "border border-gray-700 shadow-lg rounded   bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(2)}
                        ><div class="text-xs"><small>Jadwal2</small></div>
                        <div class="text-xs font-bold">{waktuSemprot2}</div>
                    </button>
                    <button
                        class={jadwal3Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(3)}
                        ><div class="text-xs"><small>Jadwal3</small></div>
                        <div class="text-xs font-bold">{waktuSemprot3}</div>
                    </button>
                    <button
                        class={jadwal4Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(4)}
                        ><div class="text-xs"><small>Jadwal4</small></div>
                        <div class="text-xs font-bold">{waktuSemprot4}</div>
                    </button>
                    <button
                        class={jadwal5Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(5)}
                        ><div class="text-xs"><small>Jadwal5</small></div>
                        <div class="text-xs font-bold">{waktuSemprot5}</div>
                    </button>
                </div>

                <details class="dropdown w-full h-56">
                    <!--set dosis manual-->
                    <summary
                        class="text-xl mt-4 pt-1 text-center bg-[#0000ff] text-white h-10 rounded-lg rounded-bl-none rounded-br-none border border-blue-950"
                        >Semprot Pestisida</summary
                    >
                    <div
                        class="w-full dropdown-content z-[1] bg-white rounded-lg rounded-tl-none rounded-tr-none shadow-lg border"
                    >
                        <div class="grid grid-cols-2 gap-2 h-14 px-2 mt-4">
                            <label class=" border rounded border-emerald-650">
                                <div
                                    class="text-center text-xs bg-blue-100 rounded rounded-bl-none rounded-br-none"
                                >
                                    Dosis Air <b>{$dosisAirPestisida}</b> Liter
                                </div>
                                <div class="grid justify-items-center">
                                    <input
                                        class="w-3/4 h-2 mt-4"
                                        type="range"
                                        bind:value={$dosisAirPestisida}
                                        on:change={() =>
                                            simpanDosisAirPestisida()}
                                        min="1"
                                        max="20"
                                    />
                                </div>
                            </label>
                            <label class=" border rounded border-emerald-650">
                                <div
                                    class="text-center text-xs bg-blue-100 rounded rounded-bl-none rounded-br-none"
                                >
                                    Dosis Pestisida <b>{$dosisPestisida}</b> mL
                                </div>
                                <div class="grid justify-items-center">
                                    <input
                                        class="w-3/4 h-2 mt-4"
                                        type="range"
                                        bind:value={$dosisPestisida}
                                        on:change={() => simpanDosisPestisida()}
                                        min="1"
                                        max="50"
                                    />
                                </div>
                            </label>
                        </div>

                        <!--pilih lahan-->
                        <div class="grid grid-cols-4 mt-4">
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan1</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan1Pestisida_status}
                                            on:change={() =>
                                                semprotPestisida(1)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan2</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan2Pestisida_status}
                                            on:change={() =>
                                                semprotPestisida(2)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan3</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan3Pestisida_status}
                                            on:change={() =>
                                                semprotPestisida(3)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan4</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan4Pestisida_status}
                                            on:change={() =>
                                                semprotPestisida(4)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    ></div>

                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    >
                                        <small class=" text-xs">Semua</small>
                                        <label class="swap h-12 w-12">
                                            <!-- this hidden checkbox controls the state -->
                                            <input
                                                type="checkbox"
                                                bind:checked={$pestisida_status}
                                                on:change={() =>
                                                    semprotPestisida(0)}
                                            />
                                            <div class="swap-on">
                                                <img
                                                    src="{base}/on4.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off">
                                                <img
                                                    src="{base}/off4.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    {:else if pageNow === "biopest"}
        <div
            class="bg_biopest h-full w-full grid justify-items-center max-w-md mx-auto flex flex-col"
        >
            <div class="hd_biopest1 w-full h-16">
                <div class="text-xs w-full text-center mt-12">
                    {get(kontrolIDStore)}
                </div>
                <div class="w-full h-4 grid justify-items-center mb-2">
                    {#if $demoMode}
                        <div
                            class="text-center text-xs bg-red-500 text-white w-12 h-4"
                        >
                            <small>Demo</small>
                        </div>
                    {:else if $ble_connected}
                        <div
                            class="text-center text-xs bg-blue-900 text-white w-12 h-4"
                        >
                            <small>Bluethoot</small>
                        </div>
                    {:else if $conect_status}
                        <div
                            class="text-center text-xs bg-green-500 text-white w-12 h-4"
                        >
                            <small>Online</small>
                        </div>
                    {:else}
                        <div
                            class="text-center text-xs bg-gray-700 text-white w-12 h-4"
                        >
                            <small>Offline</small>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="w-11/12 p-1 mt-2 grid justify-items-center">
                <!--info-->
                <div
                    class="w-full mt-2 p-1 grid justify-items-center rounded-lg shadow-lg border border-gray-300"
                >
                    <div class="text-xs text-center">Total Biopestisida</div>
                    <div class="text-xl font-bold">
                        {$volumeAir} <small class="text-xs">liter</small>
                    </div>
                </div>

                <div class="grid grid-cols-5 gap-2 mt-4 h-10 w-full">
                    <button
                        class={jadwal1Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(1)}
                        ><div class="text-xs"><small>Jadwal1</small></div>
                        <div class="text-xs font-bold">{waktuSemprot1}</div>
                    </button>
                    <button
                        class={jadwal2Enable
                            ? "border border-gray-700 shadow-lg rounded   bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(2)}
                        ><div class="text-xs"><small>Jadwal2</small></div>
                        <div class="text-xs font-bold">{waktuSemprot2}</div>
                    </button>
                    <button
                        class={jadwal3Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(3)}
                        ><div class="text-xs"><small>Jadwal3</small></div>
                        <div class="text-xs font-bold">{waktuSemprot3}</div>
                    </button>
                    <button
                        class={jadwal4Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(4)}
                        ><div class="text-xs"><small>Jadwal4</small></div>
                        <div class="text-xs font-bold">{waktuSemprot4}</div>
                    </button>
                    <button
                        class={jadwal5Enable
                            ? "border border-gray-700 shadow-lg rounded  bg-green-700 text-white"
                            : "border border-gray-700 shadow-lg rounded   text-black"}
                        on:click={() => jadwalClick(5)}
                        ><div class="text-xs"><small>Jadwal5</small></div>
                        <div class="text-xs font-bold">{waktuSemprot5}</div>
                    </button>
                </div>

                <details class="dropdown w-full h-56">
                    <!--set dosis manual-->
                    <summary
                        class="text-xl mt-4 pt-1 text-center bg-[#009900] text-white h-10 rounded-lg rounded-bl-none rounded-br-none border border-blue-950"
                        >Semprot Biopestisida</summary
                    >
                    <div
                        class="w-full dropdown-content z-[1] bg-white rounded-lg rounded-tl-none rounded-tr-none shadow-lg border"
                    >
                        <div class="grid grid-cols-2 gap-2 h-14 px-2 mt-4">
                            <label class=" border rounded border-emerald-650">
                                <div
                                    class="text-center text-xs bg-green-100 rounded rounded-bl-none rounded-br-none"
                                >
                                    Dosis Air <b>{$dosisAirBiopest}</b> Liter
                                </div>
                                <div class="grid justify-items-center">
                                    <input
                                        class="w-3/4 mt-2 mb-2 range range-xs range-success"
                                        type="range"
                                        bind:value={$dosisAirBiopest}
                                        on:change={() =>
                                            simpanDosisAirBiopest()}
                                        min="1"
                                        max="20"
                                    />
                                </div>
                            </label>
                            <label class=" border rounded border-emerald-650">
                                <div
                                    class="text-center text-xs bg-green-100 rounded rounded-bl-none rounded-br-none"
                                >
                                    Dosis Pestisida <b>{$dosisBiopest}</b> mL
                                </div>
                                <div class="grid justify-items-center">
                                    <input
                                        class="w-3/4 mt-2 mb-2 range range-xs range-success"
                                        type="range"
                                        bind:value={$dosisBiopest}
                                        on:change={() => simpanDosisBiopest()}
                                        min="1"
                                        max="50"
                                    />
                                </div>
                            </label>
                        </div>

                        <!--pilih lahan-->
                        <div class="grid grid-cols-4 mt-4">
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan1</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan1Biopest_status}
                                            on:change={() => semprotBiopest(1)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan2</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan2Biopest_status}
                                            on:change={() => semprotBiopest(2)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan3</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan3Biopest_status}
                                            on:change={() => semprotBiopest(3)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                    <label
                                        class="swap h-10 w-full text-center text-xs"
                                    >
                                        <small class="mt-6 font-bold"
                                            >Lahan4</small
                                        >
                                        <input
                                            type="checkbox"
                                            bind:checked={$lahan4Biopest_status}
                                            on:change={() => semprotBiopest(4)}
                                        />
                                        <div class="swap-on h-6 w-12">
                                            <img src="{base}/on6.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off h-6 w-12">
                                            <img
                                                src="{base}/off6.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div class="col-span-2 p-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    ></div>

                                    <div
                                        class="w-full h-20 grid justify-items-center rounded-lg shadow-lg border border-gray-400"
                                    >
                                        <small class=" text-xs">Semua</small>
                                        <label class="swap h-12 w-12">
                                            <!-- this hidden checkbox controls the state -->
                                            <input
                                                type="checkbox"
                                                bind:checked={$biopest_status}
                                                on:change={() =>
                                                    semprotBiopest(0)}
                                            />
                                            <div class="swap-on">
                                                <img
                                                    src="{base}/on4.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off">
                                                <img
                                                    src="{base}/off4.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    {:else if pageNow === "setup"}
        <div class="mainbg h-full w-full max-w-md mx-auto flex flex-col">
            <div class="hd_home w-full h-16">
                <div class="text-xs w-full text-center mt-12">
                    {get(kontrolIDStore)} ~ {get(clientIDStore)}
                </div>
                <div class="w-full h-4 grid justify-items-center mb-2">
                    {#if $demoMode}
                        <div
                            class="text-center text-xs bg-red-500 text-white w-12 h-4"
                        >
                            <small>Demo</small>
                        </div>
                    {:else if $ble_connected}
                        <div
                            class="text-center text-xs bg-blue-900 text-white w-12 h-4"
                        >
                            <small>Bluethoot</small>
                        </div>
                    {:else if $conect_status}
                        <div
                            class="text-center text-xs bg-green-500 text-white w-12 h-4"
                        >
                            <small>Online</small>
                        </div>
                    {:else}
                        <div
                            class="text-center text-xs bg-gray-700 text-white w-12 h-4"
                        >
                            <small>Offline</small>
                        </div>
                    {/if}
                </div>
            </div>

            <!--tab menu setup-->
            <div class="w-full p-2 mt-8">
                <div role="tablist" class="tabs tabs-lifted">
                    <!--tab Kalibrasi-->
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab text-xs"
                        aria-label="Kalibrasi"
                    />
                    <div role="tabpanel" class="tab-content bg-base-100 p-2">
                        <div class="grid grid-cols-3 w-3/4 h-6 my-4">
                            <button
                                on:click={() => (pilihKalibrasi = 0)}
                                class={pilihKalibrasi === 0
                                    ? "border bg-gray-700 text-white text-xs"
                                    : "border text-black text-xs"}
                                >Pestisida</button
                            >
                            <button
                                on:click={() => (pilihKalibrasi = 1)}
                                class={pilihKalibrasi === 1
                                    ? "border bg-gray-700 text-white text-xs"
                                    : "border text-black text-xs"}
                                >Biopest</button
                            >
                            <button
                                on:click={() => (pilihKalibrasi = 2)}
                                class={pilihKalibrasi === 2
                                    ? "border bg-gray-700 text-white text-xs"
                                    : "border text-black text-xs"}
                                >Lengas</button
                            >
                        </div>
                        {#if pilihKalibrasi === 0}
                            <!--pestisida-->
                            <div
                                class="grid grid-cols-8 border gap-2 bg-blue-100"
                            >
                                <div
                                    class="col-span-8 h-6 mb-4 bg-[#0000ff] text-white text-center text-xs font-bold pt-1"
                                >
                                    Kalibrasi pestisida 10 mL
                                </div>

                                <input
                                    class="col-span-3 ml-2 mb-2 range range-xs range-primary"
                                    type="range"
                                    min="1"
                                    max="20"
                                    bind:value={$kalibrasiPestisida}
                                />
                                <button class="h-6 mb-2 text-center"
                                    >{$kalibrasiPestisida}</button
                                >
                                <button
                                    on:click={() => kalibrasiPestisida_start()}
                                    class="col-span-2 h-6 mb-2 border border-gray-400 rounded text-xs"
                                    >Mulai</button
                                >
                                <button
                                    class="col-span-2 h-6 mr-2 mb-4 border bg-[#0000ff] text-white text-xs rounded"
                                    on:click={() => simpanKalibrasi_pestisida()}
                                    >Simpan</button
                                >
                            </div>

                            <div
                                class="grid grid-cols-8 border gap-2 bg-blue-100 mt-8"
                            >
                                <div
                                    class="col-span-8 h-6 mb-4 bg-[#0000ff] text-white text-center text-xs font-bold pt-1"
                                >
                                    Kalibrasi Air Pestisida 3 liter
                                </div>

                                <input
                                    class="col-span-3 ml-2 mb-2 range range-xs range-primary"
                                    type="range"
                                    min="1"
                                    max="20"
                                    bind:value={$kalibrasiAirPestisida}
                                />
                                <button class="h-6 mb-2 text-center"
                                    >{$kalibrasiAirPestisida}</button
                                >
                                <button
                                    on:click={() =>
                                        kalibrasiAirPestisida_start()}
                                    class="col-span-2 h-6 mb-2 border border-gray-400 rounded text-xs"
                                    >Mulai</button
                                >
                                <button
                                    class="col-span-2 h-6 mr-2 mb-4 border bg-[#0000ff] text-white text-xs rounded"
                                    on:click={() =>
                                        simpanKalibrasiAir_pestisida()}
                                    >Simpan</button
                                >
                            </div>
                        {:else if pilihKalibrasi === 1}
                            <!--biopest-->
                            <div
                                class="grid grid-cols-8 border gap-2 bg-green-100"
                            >
                                <div
                                    class="col-span-8 h-6 mb-4 bg-[#009900] text-white text-center text-xs font-bold pt-1"
                                >
                                    Kalibrasi Biopestisida 10 mL
                                </div>

                                <input
                                    class="col-span-3 ml-2 mb-2 range range-xs range-success"
                                    type="range"
                                    min="1"
                                    max="20"
                                    bind:value={$kalibrasiBiopest}
                                />
                                <button class="h-6 mb-2 text-center"
                                    >{$kalibrasiBiopest}</button
                                >
                                <button
                                    on:click={() => kalibrasiBiopest_start()}
                                    class="col-span-2 h-6 mb-2 border border-gray-400 rounded text-xs"
                                    >Mulai</button
                                >
                                <button
                                    on:click={() => simpanKalibrasi_biopest()}
                                    class="col-span-2 h-6 mr-2 mb-4 border bg-[#009900] text-white text-xs rounded"
                                    >Simpan</button
                                >
                            </div>

                            <div
                                class="grid grid-cols-8 border gap-2 bg-green-100 mt-8"
                            >
                                <div
                                    class="col-span-8 h-6 mb-4 bg-[#009900] text-white text-center text-xs font-bold pt-1"
                                >
                                    Kalibrasi Air Biopestisida 3 liter
                                </div>

                                <input
                                    class="col-span-3 ml-2 mb-2 range range-xs range-success"
                                    type="range"
                                    min="1"
                                    max="20"
                                    bind:value={$kalibrasiAirBiopest}
                                />
                                <button class="h-6 mb-2 text-center"
                                    >{$kalibrasiAirBiopest}</button
                                >
                                <button
                                    on:click={() => kalibrasiAirBiopest_start()}
                                    class="col-span-2 h-6 mb-2 border border-gray-400 rounded text-xs"
                                    >Mulai</button
                                >
                                <button
                                    on:click={() =>
                                        simpanKalibrasiAir_biopest()}
                                    class="col-span-2 h-6 mr-2 mb-4 border bg-[#009900] text-white text-xs rounded"
                                    >Simpan</button
                                >
                            </div>
                        {:else if pilihKalibrasi === 2}
                            <!--kalibrasi sensor lengas-->
                            <div class="grid grid-cols-2 gap-2">
                                <!--kalibrasi lengas1-->
                                <div
                                    class="border border-gray-400 rounded grid grid-cols-3 gap-4 p-2 bg-gray-200"
                                >
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Set 0%
                                        <input
                                            type="number"
                                            bind:value={set0_1}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        100%

                                        <input
                                            type="number"
                                            bind:value={set100_1}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <div class="text-lg text-center mt-4">
                                        {$lengas1raw}
                                    </div>
                                    <div
                                        class="col-span-3 grid grid-cols-2 gap-4"
                                    >
                                        <button
                                            on:click={() =>
                                                simpanKalibrasiLengas(1)}
                                            class="mt-2 border border-gray-400 bg-green-800 text-xs text-white w-full h-8"
                                        >
                                            Simpan</button
                                        >

                                        <label
                                            class="swap h-12 w-full text-center text-[10px]"
                                        >
                                            <input
                                                type="checkbox"
                                                bind:checked={kal_lengas1}
                                                on:change={() =>
                                                    kalibrasiLengas_start(1)}
                                            />
                                            <div class="swap-on h-6 w-12">
                                                <img
                                                    src="{base}/on6.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off h-6 w-12">
                                                <img
                                                    src="{base}/off6.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!--kalibrasi lengas2-->
                                <div
                                    class="border border-gray-400 rounded grid grid-cols-3 gap-4 p-2 bg-gray-200"
                                >
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Set 0%
                                        <input
                                            type="number"
                                            bind:value={set0_2}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        100%

                                        <input
                                            type="number"
                                            bind:value={set100_2}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <div class="text-lg text-center mt-4">
                                        {$lengas2raw}
                                    </div>
                                    <div
                                        class="col-span-3 grid grid-cols-2 gap-4"
                                    >
                                        <button
                                            on:click={() =>
                                                simpanKalibrasiLengas(2)}
                                            class="mt-2 border border-gray-400 bg-green-800 text-xs text-white w-full h-8"
                                        >
                                            Simpan</button
                                        >

                                        <label
                                            class="swap h-12 w-full text-center text-[10px]"
                                        >
                                            <input
                                                type="checkbox"
                                                bind:checked={kal_lengas2}
                                                on:change={() =>
                                                    kalibrasiLengas_start(2)}
                                            />
                                            <div class="swap-on h-6 w-12">
                                                <img
                                                    src="{base}/on6.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off h-6 w-12">
                                                <img
                                                    src="{base}/off6.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!--kalibrasi lengas3-->
                                <div
                                    class="border border-gray-400 rounded grid grid-cols-3 gap-4 p-2 bg-gray-200"
                                >
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Set 0%
                                        <input
                                            type="number"
                                            bind:value={set0_3}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        100%

                                        <input
                                            type="number"
                                            bind:value={set100_3}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <div class="text-lg text-center mt-4">
                                        {$lengas3raw}
                                    </div>
                                    <div
                                        class="col-span-3 grid grid-cols-2 gap-4"
                                    >
                                        <button
                                            on:click={() =>
                                                simpanKalibrasiLengas(3)}
                                            class="mt-2 border border-gray-400 bg-green-800 text-xs text-white w-full h-8"
                                        >
                                            Simpan</button
                                        >

                                        <label
                                            class="swap h-12 w-full text-center text-[10px]"
                                        >
                                            <input
                                                type="checkbox"
                                                bind:checked={kal_lengas3}
                                                on:change={() =>
                                                    kalibrasiLengas_start(3)}
                                            />
                                            <div class="swap-on h-6 w-12">
                                                <img
                                                    src="{base}/on6.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off h-6 w-12">
                                                <img
                                                    src="{base}/off6.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <!--kalibrasi lengas4-->
                                <div
                                    class="border border-gray-400 rounded grid grid-cols-3 gap-4 p-2 bg-gray-200"
                                >
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Set 0%
                                        <input
                                            type="number"
                                            bind:value={set0_4}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        100%

                                        <input
                                            type="number"
                                            bind:value={set100_4}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                    <div class="text-lg text-center mt-4">
                                        {$lengas4raw}
                                    </div>
                                    <div
                                        class="col-span-3 grid grid-cols-2 gap-4"
                                    >
                                        <button
                                            on:click={() =>
                                                simpanKalibrasiLengas(4)}
                                            class="mt-2 border border-gray-400 bg-green-800 text-xs text-white w-full h-8"
                                        >
                                            Simpan</button
                                        >

                                        <label
                                            class="swap h-12 w-full text-center text-[10px]"
                                        >
                                            <input
                                                type="checkbox"
                                                bind:checked={kal_lengas4}
                                                on:change={() =>
                                                    kalibrasiLengas_start(4)}
                                            />
                                            <div class="swap-on h-6 w-12">
                                                <img
                                                    src="{base}/on6.png"
                                                    alt="btn_on"
                                                />
                                            </div>
                                            <div class="swap-off h-6 w-12">
                                                <img
                                                    src="{base}/off6.png"
                                                    alt="btn_off"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>

                    <!--tab kontrol-->
                    <input
                        checked
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab text-xs"
                        aria-label="Kontrol"
                    />
                    <div
                        role="tabpanel"
                        class="tab-content bg-base-100 border-base-300 rounded-box p-2"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <!--lahan-->
                            <div
                                class="grid grid-cols-2 border p-1 border-gray-400 rounded"
                            >
                                <div
                                    class="col-span-2 text-[12px] font-bold text-center mb-2"
                                >
                                    Selenoid Lahan
                                </div>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Lahan1
                                    <input
                                        type="checkbox"
                                        bind:checked={$lahan1_status}
                                        on:change={() =>
                                            selenoidLahan(1, $lahan1_status)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Lahan2
                                    <input
                                        type="checkbox"
                                        bind:checked={$lahan2_status}
                                        on:change={() =>
                                            selenoidLahan(2, $lahan2_status)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Lahan3
                                    <input
                                        type="checkbox"
                                        bind:checked={$lahan3_status}
                                        on:change={() =>
                                            selenoidLahan(3, $lahan3_status)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Lahan4
                                    <input
                                        type="checkbox"
                                        bind:checked={$lahan4_status}
                                        on:change={() =>
                                            selenoidLahan(4, $lahan4_status)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                            </div>
                            <!--pompa-->
                            <div
                                class="grid grid-cols-2 gap-2 border p-1 border-gray-400 rounded"
                            >
                                <div
                                    class="col-span-2 text-center font-bold text-xs"
                                >
                                    Pompa
                                </div>
                                <div
                                    class="w-full h-20 mt-2 grid justify-items-center text-xs font-bold rounded shadow-lg border border-gray-200"
                                >
                                    <small>Semprot</small>
                                    <label class="swap h-12 w-12">
                                        <!-- this hidden checkbox controls the state -->
                                        <input
                                            type="checkbox"
                                            bind:checked={pompaSemprot_sts}
                                            on:change={() => pompaTes(2)}
                                        />
                                        <div class="swap-on">
                                            <img src="{base}/on4.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off">
                                            <img
                                                src="{base}/off4.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div
                                    class="w-full h-20 mt-2 text-xs font-bold grid justify-items-center rounded shadow-lg border border-gray-200"
                                >
                                    <small>Utama</small>
                                    <label class="swap h-12 w-12">
                                        <!-- this hidden checkbox controls the state -->
                                        <input
                                            type="checkbox"
                                            bind:checked={pompaUtama_sts}
                                            on:change={() => pompaTes(1)}
                                        />
                                        <div class="swap-on">
                                            <img src="{base}/on4.png" alt="btn_on" />
                                        </div>
                                        <div class="swap-off">
                                            <img
                                                src="{base}/off4.png"
                                                alt="btn_off"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <!--pestisida-->
                            <div
                                class="grid grid-cols-2 border p-1 border-gray-400 rounded"
                            >
                                <div
                                    class="col-span-2 text-[12px] font-bold text-center mb-2"
                                >
                                    Pestisida
                                </div>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Pompa
                                    <input
                                        type="checkbox"
                                        bind:checked={pompaPestisida_sts}
                                        on:change={() => pompaTes(3)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Aduk
                                    <input
                                        type="checkbox"
                                        bind:checked={pompaAdukPestisida_sts}
                                        on:change={() => pompaTes(4)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Inlet
                                    <input
                                        type="checkbox"
                                        bind:checked={selenoidInletPestisida_sts}
                                        on:change={() => selenoidTes(1)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Outlet
                                    <input
                                        type="checkbox"
                                        bind:checked={selenoidOutletPestisida_sts}
                                        on:change={() => selenoidTes(2)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                            </div>

                            <!--biopest-->
                            <div
                                class="grid grid-cols-2 border p-1 border-gray-400 rounded"
                            >
                                <div
                                    class="col-span-2 text-[12px] font-bold text-center mb-2"
                                >
                                    Biopestisida
                                </div>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Pompa
                                    <input
                                        type="checkbox"
                                        bind:checked={pompaBiopest_sts}
                                        on:change={() => pompaTes(5)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Aduk
                                    <input
                                        type="checkbox"
                                        bind:checked={pompaAdukBiopest_sts}
                                        on:change={() => pompaTes(6)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>

                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Inlet
                                    <input
                                        type="checkbox"
                                        bind:checked={selenoidInletBiopest_sts}
                                        on:change={() => selenoidTes(3)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                                <label
                                    class="swap h-12 w-full text-center text-[10px]"
                                    >Outlet
                                    <input
                                        type="checkbox"
                                        bind:checked={selenoidOutletBiopest_sts}
                                        on:change={() => selenoidTes(4)}
                                    />
                                    <div class="swap-on h-6 w-12">
                                        <img src="{base}/on6.png" alt="btn_on" />
                                    </div>
                                    <div class="swap-off h-6 w-12">
                                        <img src="{base}/off6.png" alt="btn_off" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!--tab admin-->
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab text-xs"
                        aria-label="admin"
                    />
                    <div
                        role="tabpanel"
                        class="tab-content bg-base-100 border-base-300 rounded-box p-2"
                    >
                        <div
                            class=" w-full h-10 p-2 mt-4 grid grid-cols-4 gap-2 bg-base-100 border"
                        >
                            <div class="text-center">KontrolID</div>
                            <input
                                class="w-full h-6 border border-black rounded text-center text-[12px]"
                                type="text"
                                placeholder={get(kontrolIDStore)}
                                bind:value={kontrolId_value}
                            />

                            <button
                                on:click={() => simpanId()}
                                class="w-full h-6 border bg-green-500 rounded border-green-900"
                                >Simpan</button
                            >
                        </div>

                        <div
                            class=" w-full h-20 p-2 gap-1 bg-base-100 border mt-2"
                        >
                            <label class="form-control w-full max-w-xs h-6">
                                <select
                                    class="select select-bordered"
                                    bind:value={brokerUse_value}
                                    on:change={() => simpanBroker()}
                                >
                                    <option disabled selected
                                        >Pilih Server</option
                                    >
                                    <option>Server 1</option>
                                    <option>Server 2</option>
                                    <option>Server 3</option>
                                </select>
                            </label>
                        </div>

                        <div
                            class="w-full border mt-4 p-4 grid justify-items-center"
                        >
                            <form on:submit|preventDefault={handleSubmit}>
                                <input
                                    type="file"
                                    on:change={handleFileChange}
                                />
                                <button type="submit">Upload</button>
                            </form>

                            {#if responseMessage}
                                <p>{responseMessage}</p>
                            {/if}
                        </div>
                    </div>

                    <!-- tab ble-->
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab text-xs"
                        aria-label="Bluethoot"
                    />
                    <div
                        role="tabpanel"
                        class="tab-content bg-base-100 border-base-300 rounded-box p-2"
                    >
                        <button
                            on:click={() => ble_connect()}
                            class={$ble_connected
                                ? "w-full h-8 border bg-blue-900 rounded border-blue-200 text-white"
                                : "w-full h-8 border bg-blue-100 rounded border-blue-900 text-blue"}
                        >
                            {#if !$ble_connected}
                                Sambungkan ke Kontroller
                            {:else}
                                Putus Kontroller
                            {/if}
                        </button>
                        {#if $ble_connected}
                            <div
                                class=" w-full h-30 p-2 grid grid-cols-4 gap-2 bg-base-100 border mt-2"
                            >
                                <div class="text-left col-span-2 text-xs">
                                    WIFI SSID
                                </div>
                                <div class="text-left col-span-2 text-xs">
                                    Password
                                </div>
                                <input
                                    class="w-full h-6 col-span-2 border border-black rounded text-center"
                                    type="text"
                                    placeholder={$wifiSSIDStore}
                                    bind:value={wifiSSID_value}
                                />
                                <input
                                    class="w-full h-6 col-span-2 border border-black rounded text-center"
                                    type="text"
                                    placeholder={$wifiPasswordStore}
                                    bind:value={wifiPassword_value}
                                />

                                <button
                                    on:click={() => simpanWifi()}
                                    class="w-full h-6 border col-span-4 bg-green-500 rounded border-green-900"
                                    >Simpan WiFi</button
                                >
                            </div>
                            <div
                                class="w-full border mt-2 p-2 grid grid-cols-2 gap-4"
                            >
                                <div>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Nama User
                                        <input
                                            type="text"
                                            bind:value={username}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Password
                                        <input
                                            type="text"
                                            bind:value={password}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Password baru
                                        <input
                                            type="text"
                                            bind:value={newPassword1}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label
                                        class="form-control w-full text-[10px]"
                                    >
                                        Password baru(ulang)
                                        <input
                                            type="text"
                                            bind:value={newPassword2}
                                            placeholder="---"
                                            class="border border-gray-400 rounded text-center text-xs w-full h-6"
                                        />
                                    </label>
                                </div>
                                <button
                                    class="border border-gray-400 rounded col-span-2 text-center text-xs w-full h-8 mt-2"
                                    >Simpan</button
                                >
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    
    
        {/if}

    {#if pageNow != 'login'}
    <div
        class="btm-nav-xs h-6 w-full max-w-md mx-auto grid grid-cols-5 bg-zinc-200"
    >
        <button
            on:click={() => pageClick("siram")}
            class="bg-white text-blue-800 content-center"
        >
            <div class="w-full w-full flex justify-center">
                <img class="w-8 h-8" src="{base}/penyiraman.png" alt="siram" />
            </div>
            <span class="btm-nav-label">Siram</span>
        </button>
        <button
            on:click={() => pageClick("pestisida")}
            class="bg-white text-blue-800 content-center"
        >
            <div class="w-full w-full flex justify-center">
                <img class="w-8 h-8" src="{base}/pestisida.png" alt="pestisida" />
            </div>
            <span class="btm-nav-label">Pestisida</span>
        </button>
        <button
            on:click={() => pageClick("biopest")}
            class="bg-white text-blue-800 content-center"
        >
            <div class="w-full w-full flex justify-center">
                <img class="w-8 h-8" src="{base}/biopestisida.png" alt="biopest" />
            </div>
            <div class="btm-nav-label">Biopest</div>
        </button>
        <button
            on:click={() => pageClick("setup")}
            class="bg-white text-blue-800 content-center"
        >
            <div class="w-full w-full flex justify-center">
                <img class="w-5 h-5" src="{base}/setup.png" alt="setup" />
            </div>
            <span class="btm-nav-label">Setup</span>
        </button>

        <button
            on:click={() => pageClick("login")}
            class="bg-white text-blue-800 content-center"
        >
            <div class="w-full w-full flex justify-center">
                <img class="w-5 h-5" src="{base}/exit.png" alt="exit" />
            </div>
            <span class="btm-nav-label">Keluar</span>
        </button>
    </div>

    {/if}

</div>

<!--pop up-->
<Modal bind:showModal bind:timeOut>
	{#if showMode === 1}
		{#if showjadwal === 1}
			<!-- jadwal 1-->
			<div class="grid justify-items-center border-1">
				<div class="w-full text-center font-bold">Jadwal 1</div>
				<div class="w-full grid grid-cols-3 gap-2 mt-4">
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Waktu
						</div>
						<SveltyPicker
							bind:value={waktuSiram1}
							inputClasses="w-3/4 font-bold text-lg text-center mx-4"
							placeholder="06:30"
							format="hh:ii"
							displayFormat="hh:ii "
						/>
					</div>
					<label class=" border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Durasi <b>{durasiSiram1}</b> menit
						</div>
						<div class="grid justify-items-center">
							<input
								class="w-3/4 h-2 my-4"
								type="range"
								bind:value={durasiSiram1}
								min="1"
								max="15"
							/>
						</div>
					</label>
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Aktifkan
						</div>
						<label class="swap h-10 w-full text-center text-xs">
							<input
								type="checkbox"
								bind:checked={jadwal1Enable}
								on:change={() => jadwalAktif(1)}
							/>
							<div class="swap-on h-6 w-12">
								<img src="{base}/on6.png" alt="btn_on" />
							</div>
							<div class="swap-off h-6 w-12">
								<img src="{base}/off6.png" alt="btn_off" />
							</div>
						</label>
					</div>
				</div>
				<!-- hari-->

				<div
					class="w-full p-2 grid grid-cols-7 gap-4 mt-4 justify-items-center border border-gray-300 rounded"
				>
					{#each hari as hariNow, idx}
						<label class="text-xs">
							<div><small>{hariNow}</small></div>
							<input
								type="checkbox"
								bind:checked={cekHari1[idx]}
								on:change={() => pilihanHari1Click(idx)}
							/>
						</label>
					{/each}
				</div>

				<div
					class="w-full grid grid-cols-4 gap-4 p-2 mt-4 justify-items-center rounded border border-gray-450"
				>
					{#each lahan as lahanNow, idx}
						<label class="grid justify-items-center">
							<input
								type="checkbox"
								bind:checked={cekLahan1[idx]}
								on:change={() => lahan1Click(idx)}
							/>
							<div class="text-xs"><small>{lahanNow}</small></div>
						</label>
					{/each}
				</div>
			</div>
		{:else if showjadwal === 2}
			<!-- jadwal 2-->
			<div class="grid justify-items-center border-1">
				<div class="w-full text-center font-bold">Jadwal 2</div>
				<div class="w-full grid grid-cols-3 gap-2 mt-4">
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Waktu
						</div>
						<SveltyPicker
							bind:value={waktuSiram2}
							inputClasses="w-3/4 font-bold text-lg text-center mx-4"
							placeholder="06:30"
							format="hh:ii"
							displayFormat="hh:ii "
						/>
					</div>
					<label class=" border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Durasi <b>{durasiSiram2}</b> menit
						</div>
						<div class="grid justify-items-center">
							<input
								class="w-3/4 h-2 my-4"
								type="range"
								bind:value={durasiSiram2}
								min="1"
								max="15"
							/>
						</div>
					</label>
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Aktifkan
						</div>
						<label class="swap h-10 w-full text-center text-xs">
							<input
								type="checkbox"
								bind:checked={jadwal2Enable}
								on:change={() => jadwalAktif(2)}
							/>
							<div class="swap-on h-6 w-12">
								<img src="{base}/on6.png" alt="btn_on" />
							</div>
							<div class="swap-off h-6 w-12">
								<img src="{base}/off6.png" alt="btn_off" />
							</div>
						</label>
					</div>
				</div>
				<!-- hari-->

				<div
					class="w-full p-2 grid grid-cols-7 gap-4 mt-4 justify-items-center border border-gray-300 rounded"
				>
					{#each hari as hariNow, idx}
						<label class="text-xs">
							<div><small>{hariNow}</small></div>
							<input
								type="checkbox"
								bind:checked={cekHari2[idx]}
								on:change={() => pilihanHari2Click(idx)}
							/>
						</label>
					{/each}
				</div>

				<div
					class="w-full grid grid-cols-4 gap-4 p-2 mt-4 justify-items-center rounded border border-gray-450"
				>
					{#each lahan as lahanNow, idx}
						<label class="grid justify-items-center">
							<input
								type="checkbox"
								bind:checked={cekLahan2[idx]}
								on:change={() => lahan2Click(idx)}
							/>
							<div class="text-xs"><small>{lahanNow}</small></div>
						</label>
					{/each}
				</div>
			</div>
		{:else if showjadwal === 3}
			<!-- jadwal 3-->
			<div class="grid justify-items-center border-1">
				<div class="w-full text-center font-bold">Jadwal 3</div>
				<div class="w-full grid grid-cols-3 gap-2 mt-4">
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Waktu
						</div>
						<SveltyPicker
							bind:value={waktuSiram3}
							inputClasses="w-3/4 font-bold text-lg text-center mx-4"
							placeholder="06:30"
							format="hh:ii"
							displayFormat="hh:ii "
						/>
					</div>
					<label class=" border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Durasi <b>{durasiSiram3}</b> menit
						</div>
						<div class="grid justify-items-center">
							<input
								class="w-3/4 h-2 my-4"
								type="range"
								bind:value={durasiSiram3}
								min="1"
								max="15"
							/>
						</div>
					</label>
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Aktifkan
						</div>
						<label class="swap h-10 w-full text-center text-xs">
							<input
								type="checkbox"
								bind:checked={jadwal3Enable}
								on:change={() => jadwalAktif(3)}
							/>
							<div class="swap-on h-6 w-12">
								<img src="{base}/on6.png" alt="btn_on" />
							</div>
							<div class="swap-off h-6 w-12">
								<img src="{base}/off6.png" alt="btn_off" />
							</div>
						</label>
					</div>
				</div>
				<!-- hari-->

				<div
					class="w-full p-2 grid grid-cols-7 gap-4 mt-4 justify-items-center border border-gray-300 rounded"
				>
					{#each hari as hariNow, idx}
						<label class="text-xs">
							<div><small>{hariNow}</small></div>
							<input
								type="checkbox"
								bind:checked={cekHari3[idx]}
								on:change={() => pilihanHari3Click(idx)}
							/>
						</label>
					{/each}
				</div>

				<div
					class="w-full grid grid-cols-4 gap-4 p-2 mt-4 justify-items-center rounded border border-gray-450"
				>
					{#each lahan as lahanNow, idx}
						<label class="grid justify-items-center">
							<input
								type="checkbox"
								bind:checked={cekLahan3[idx]}
								on:change={() => lahan3Click(idx)}
							/>
							<div class="text-xs"><small>{lahanNow}</small></div>
						</label>
					{/each}
				</div>
			</div>
		{:else if showjadwal === 4}
			<!-- jadwal 4-->
			<div class="grid justify-items-center border-1">
				<div class="w-full text-center font-bold">Jadwal 4</div>
				<div class="w-full grid grid-cols-3 gap-2 mt-4">
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Waktu
						</div>
						<SveltyPicker
							bind:value={waktuSiram4}
							inputClasses="w-3/4 font-bold text-lg text-center mx-4"
							placeholder="06:30"
							format="hh:ii"
							displayFormat="hh:ii "
						/>
					</div>
					<label class=" border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Durasi <b>{durasiSiram4}</b> menit
						</div>
						<div class="grid justify-items-center">
							<input
								class="w-3/4 h-2 my-4"
								type="range"
								bind:value={durasiSiram4}
								min="1"
								max="15"
							/>
						</div>
					</label>
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Aktifkan
						</div>
						<label class="swap h-10 w-full text-center text-xs">
							<input
								type="checkbox"
								bind:checked={jadwal4Enable}
								on:change={() => jadwalAktif(4)}
							/>
							<div class="swap-on h-6 w-12">
								<img src="{base}/on6.png" alt="btn_on" />
							</div>
							<div class="swap-off h-6 w-12">
								<img src="{base}/off6.png" alt="btn_off" />
							</div>
						</label>
					</div>
				</div>
				<!-- hari-->

				<div
					class="w-full p-2 grid grid-cols-7 gap-4 mt-4 justify-items-center border border-gray-300 rounded"
				>
					{#each hari as hariNow, idx}
						<label class="text-xs">
							<div><small>{hariNow}</small></div>
							<input
								type="checkbox"
								bind:checked={cekHari4[idx]}
								on:change={() => pilihanHari4Click(idx)}
							/>
						</label>
					{/each}
				</div>

				<div
					class="w-full grid grid-cols-4 gap-4 p-2 mt-4 justify-items-center rounded border border-gray-450"
				>
					{#each lahan as lahanNow, idx}
						<label class="grid justify-items-center">
							<input
								type="checkbox"
								bind:checked={cekLahan4[idx]}
								on:change={() => lahan4Click(idx)}
							/>
							<div class="text-xs"><small>{lahanNow}</small></div>
						</label>
					{/each}
				</div>
			</div>
		{:else if showjadwal === 5}
			<!--jadwal 5-->
			<div class="grid justify-items-center border-1">
				<div class="w-full text-center font-bold">Jadwal 5</div>
				<div class="w-full grid grid-cols-3 gap-2 mt-4">
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Waktu
						</div>
						<SveltyPicker
							bind:value={waktuSiram5}
							inputClasses="w-3/4 font-bold text-lg text-center mx-4"
							placeholder="06:30"
							format="hh:ii"
							displayFormat="hh:ii "
						/>
					</div>
					<label class=" border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Durasi <b>{durasiSiram5}</b> menit
						</div>
						<div class="grid justify-items-center">
							<input
								class="w-3/4 h-2 my-4"
								type="range"
								bind:value={durasiSiram5}
								min="1"
								max="15"
							/>
						</div>
					</label>
					<div class="border rounded border-emerald-950">
						<div class="text-center text-xs bg-red-100 rounded rounded-bl-none rounded-br-none">
							Aktifkan
						</div>
						<label class="swap h-10 w-full text-center text-xs">
							<input
								type="checkbox"
								bind:checked={jadwal5Enable}
								on:change={() => jadwalAktif(5)}
							/>
							<div class="swap-on h-6 w-12">
								<img src="{base}/on6.png" alt="btn_on" />
							</div>
							<div class="swap-off h-6 w-12">
								<img src="{base}/off6.png" alt="btn_off" />
							</div>
						</label>
					</div>
				</div>
				<!-- hari-->

				<div
					class="w-full p-2 grid grid-cols-7 gap-4 mt-4 justify-items-center border border-gray-300 rounded"
				>
					{#each hari as hariNow, idx}
						<label class="text-xs">
							<div><small>{hariNow}</small></div>
							<input
								type="checkbox"
								bind:checked={cekHari5[idx]}
								on:change={() => pilihanHari5Click(idx)}
							/>
						</label>
					{/each}
				</div>

				<div
					class="w-full grid grid-cols-4 gap-4 p-2 mt-4 justify-items-center rounded border border-gray-450"
				>
					{#each lahan as lahanNow, idx}
						<label class="grid justify-items-center">
							<input
								type="checkbox"
								bind:checked={cekLahan5[idx]}
								on:change={() => lahan5Click(idx)}
							/>
							<div class="text-xs"><small>{lahanNow}</small></div>
						</label>
					{/each}
				</div>
			</div>
		{/if}
		{#if showjadwal !== 0}
			<div class="grid justify-items-center">
				<button
					on:click={() => simpanJadwalSiram()}
					class="w-1/2 h-12 border rounded-lg bg-green-900 text-white mt-4 mb-4"
					>Simpan Jadwal</button
				>
			</div>
		{/if}
	{:else if showMode === 2}
		<h3 class="text-xl font-bold text-center">Set Durasi Siram Manual</h3>
		<hr />
		<div class="grid grid-cols-3 my-4 justify-items-center">
			<input
				type="range"
				min="2"
				max="15"
				bind:value={$durasiManual}
				on:change={() => simpanDurasi()}
				class="range range-warning col-span-2"
			/>

			<div class="text-center">
				{$durasiManual} Menit
			</div>
		</div>
	{:else if showMode === 3}
		<!-- alert-->
		<h3 class="text-xl font-bold text-center text-red-500">!!! Perhatian !!!</h3>
		<hr />

		{#if alertType === 0}
			{#if $runMode === 1}
				<div>Sedang Penyiraman</div>
			{:else if $runMode === 2}
				<div>Sedang Penyemprotan Pestisida</div>
			{:else if $runMode === 3}
				<div>Sedang Penyemproten Biopest</div>
			{/if}
		{:else if alertType === 1}
			<div class="text-center w-full">Fungsi ini tidak berjalan di mode Demo</div>
		{:else if alertType === 2}<!--koneksi-->
			<div class="text-center w-full">Sedang Offline</div>
		{:else if alertType === 3}<!--lahan-->
			<div class="text-center w-full">Pilih Lahan</div>
		{:else if alertType === 4}<!--Hari-->
			<div class="text-center w-full">Pilih Hari</div>
		{:else if alertType === 5}<!--Hari-->
			<div class="text-center w-full">Jadwal Siram disimpan</div>
		{/if}
	{/if}
</Modal>

<style>
    .bg_login {
        background-image: url("/bg_opening.png");
        background-position: center;
        background-size: cover;
    }
    .bg_siram {
        background-image: url("/bg_siram.png");
        background-position: center;
        background-size: cover;
    }
    .hd_siram1 {
        background-image: url("/hd_siram1.png");
        background-position: center;
        background-size: cover;
    }
    .bg_pestisida {
        background-image: url(" /bg_pestisida.png");
        background-size: cover;
        background-position: center;
    }
    .hd_pestisida1 {
        background-image: url("/hd_pestisida1.png");
        background-size: cover;
        background-position: center;
    }
    .bg_biopest {
        background-image: url("/bg_biopest.png");
        background-size: cover;
        background-position: center;
    }
    .hd_biopest1 {
        background-image: url("/hd_biopest1.png");
        background-size: cover;
        background-position: center;
    }
    .mainbg {
        background-image: url("/bg_home.png");
        background-position: center;
        background-size: cover;
    }
    .hd_home {
        background-image: url("/hd_home.png");
        background-position: center;
        background-size: cover;
    }
</style>
