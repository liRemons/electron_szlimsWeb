let textArr = ["能量:12keV,核素:无", "能量:23keV,核素:无", "能量:35keV,核素:无", "能量:47keV,核素:Eu-154,Gd-159,Pb-210,Th-227", "能量:59keV,核素:Xe-125,Sb-127,Ce-143,Eu-155,Gd-159,Tb-161,Ho-166,Hf-175,Hf-181,Ta-182，W-182,Th-234,Pa-234,Pu-237,U-237,Np-239,Am-241", "能量:70keV,核素:Se-75,Cs-136,Pm-151,Sm-153,Gd-153.Tb-161,Hf-181,Ta-182,W-187,Tl-201,Hg-203,Pb-212,Am-243", "能量:82keV,核素:Zn-72,Sn-126,I-131,Te-131M,Ba-133,Xe-133,Cs-136,Ce-144,Eu-155,Tb-160,Ho-166,Ta-182,Tl-201,Hg-203,Pb-212,Th-227,Th-228,Th-231,Pa-233,Pu-243", "能量:94keV,核素:Se-75,I-132M,Nd-147,Pm-148M.Gd-153,Hf-175,Th-227,Ac-228,Pa-233,Th-234,Pa-234,U-235,Pu-237,U-237", "能量:105keV,核素:Zn-72,Te-131M,Pm-151,Sm-153,Gd-153,Eu-155,Sm-156,Ta-182,U-235,Pu-237,U-237,Np-239,Cm-243,Am-244,Cm-245", "能量:117keV,核素:Zn-72,Se-75,Te-132,Eu-152M,Eu-152,Ta-182,Pa-234,Pu-237,U-237,Np-239,Cm-243,Cm-245", "能量:129keV,核素:Ce-144,Hf-181,Ac-228,Pa-234,Cm-245", "能量:141keV,核素:Co-57,Zn-72,Se-75,Tc-99M,Mo-99,Ce-141,Hf-181,Pa-234,U-235", "能量:152keV,核素:Kr-85M,Ru-105,Sn-117M,Te-131M,Cs-136,Ta-182,Pa-234,Am-244", "能量:164keV,核素:Kr-88,Xe-131M,Cs-136,Ce-139,Ba-139,Ba-140,Pm-151,Sm-156,Tl-201,U-235,U-237", "能量:176keV,核素:Sb-125,Sb-129,I-132M,Cs-136,Pm-151,Ta-182,Cm-245", "能量:188keV,核素:Fe-59,Zn-72,Xe-125,Pm-148M,Ra-226,Pa-234,U-235", "能量:199keV,核素:Se-75.Ge-77,Kr-88,Xe-129M,Te-131M,Tb-160,Ta-182,Pa-234,U-235", "能量:211keV,核素:Ge-77,Sb-128,Pm-151,Tb-160,Th-227,Ac-228,U-237,Np-239,Cm-243", "能量:223keV,核素:Br-82,Nb-96,Rh-106M,Sb-126,Sb-128,I-135,Ta-182,Pa-234", "能量:234keV,核素:Nb-95M,Xe-133M,Ce-143,Pm-151,Ta-182,Pb-212,Th-227", "能量:246keV,核素:Sr-92,Nb-96,Ag-111,Xe-125,Xe-135,Eu-152,Sm-156,Pa-234", "能量:258keV,核素:Zr-92,Ru-105,Sn-115,Ag-113,Cd-115,I-132,Th-227", "能量:270keV,核素:Sr-91,Y-93,Ba-135M,Cs-136,Sm-156,Ac-228", "能量:281keV,核素:Se-71,Sb-126,I-131,Te-131M,Ba-133,Pm-149,Hg-203,Pa-231,Np-239,Cm-243", "能量:293keV,核素:Sb-126,Sb-127,Sb-129,I-135,Ce-143,Pm-148M,Sm-156,Th-227,Pa-234,", "能量:305keV,核素:Se-75,Kr-85M,Rh-105,Ba-133,Ba-140,Pb-212,Th-227,Pa-231,Pa-233", "能量:316keV,核素:Cr-51,Tc-96,Ru-105,Ag-113,Sb-128,Nd-147,Pm-148M,Pa-233,Np-239", "能量:328keV,核素:Ru-105,Sn-125,La-140,Pa-151,Th-227,Ac-228,Pa-231,U-237", "能量:340keV,核素:Ag-111,In-115M,Cs-136,Pm-151,Eu-152M,Eu-152,Hf-175,Ac-228,Pa-233", "能量:352keV,核素:Zr-97,Ru-105,Ba-133,Ce-143", "能量:363keV,核素:Ni-65,Ge-77,Kr-88,Mo-99,Sb-128,Sb-129,I-131,Te-131M,Gd-159", "能量:375keV,核素:Nb-96,Pa-234", "能量:387keV,核素:Rh-106M,In-113M,I-126,Ba-133", "能量:398keV,核素:Se-75,Kr-87,Ru-105,Pa-233", "能量:410keV,核素:Ru-105,Rh-106M,Sb-126,Sb-127,Pm-148M,Eu-152,Ac-228", "能量:422keV,核素:Ge-77,Rh-102,I-130,I-135,Ba-140", "能量:434keV,核素:Zn-69M,Sr-92,Rh-106M,,La-140,Ba-140,Pm-148M,Hf-175", "能量:445keV,核素:Y-92,Ag-110M,Sb-127,Sb-128,Pm-151,Eu-152", "能量:457keV,核素:Ge-77,Nb-96,Xe-125,Sb-128,Te-129,Te-131M,Pa-234", "能量:469keV,核素:Br-76,Ru-105,Sn-125,Sb-127,Cs-132", "能量:480keV,核素:Be-7,Nb-96,Rh-102,Cs-134,Hf-181,W-187", "能量:492keV,核素:Cd-115,I-126,Te-129,La-140,Ce-143", "能量:504keV,核素:Zr-97,Ru-105,I-132,Pm-148M,Pa-234", "能量:516keV,核素:Rb-83,Sr-85,Rh-106M", "能量:527keV,核素:Rb-83,Cd-115,Sb-128,Sb-129,I-132,I-133,Nd-147", "能量:539keV,核素:Sb-127,I-130,Ba-140", "能量:551keV,核素:Br-82,Rb-83,Sb-126,I-132,I-135,Pm-148M,Pm-148,W-187", "能量:562keV,核素:Br-76,As-76,Ge-77,Y-92,Sb-122,Cs-134", "能量:574keV,核素:Sb-126,Cs-134,Pa-234", "能量:586keV,核素:Sb-128,I-130,Te-131M", "能量:598keV,核素:Ga-72,Zr-97,Rh-1O6M,I-124,Sb-124,Sb-125,I-132M,Pm-148M,Eu-156", "能量:609keV,核素:Br-82,Ru-103,Sb-125,I-132M,Cs-134,Xe-135,Pm-148M,Pm-148", "能量:621keV,核素:Br-83,Sr-91,Rh-106M,Ag-110M,I-132,W-187", "能量:633keV,核素:Ga-72,Ge-77,Rh-102,Sb-125,Sb-128,Sb-129,I-131,I-132,Pm-148M,Pm-151", "能量:645keV,核素:Rh-106M,Sb-124,Eu-156", "能量:656keV,核素:Br-76,As-76,Sr-91,Nb-97,Ru-105,Ag-110M,Sb-126,Sb-128,Sb-129", "能量:668keV,核素:Sb-125,I-126,Sb-126,Sb-128,I-130,Te-131M,Cs-132,I-132M,I-132,Ce-143,Pa-234", "能量:680keV,核素:Ru-105,Rh-106M,Ag-110M,Sb-128,Sb-129", "能量:691keV,核素:Rh-102,Ag-110M,Sb-122,Sb-126,Sb-128,,Te-129M,I-130,Eu-154,Pa-234", "能量:703keV,核素:Br-82,Nb-94,Zr-97,Rh-106M,Ag-110M,Sb-127,I-133,Pa-234", "能量:715keV,核素:Ge-77,Nb-96,Rh-106M,Sb-124,Te-131M,Pm-151", "能量:727keV,核素:Zr-95,Ru-105,I-124,Sb-124,Sb-127,Sb-128,I-131,I-132,Pm-148M,Eu-154,Eu-156,Bi-212", "能量:738keV,核素:Mo-99,I-130,Pa-234", "能量:750keV,核素:Sr-91,Rh-106M,I-126,Sb-128,La-140,Pm-151,Pa-234,Am-244", "能量:762keV,核素:Nb-95,Rh-102,Ag-110M,Sb-129,Tb-160", "能量:773keV,核素:Br-82,,Mo-99,Sb-128,Sb-129,Te-131M,I-132M,I-132,W-187,Ac-228", "能量:785keV,核素:Ga-72,Ge-77,Sb-127,Sb-129,Te-131M,Bi-212,Pa-234", "能量:797keV,核素:Rh-106M,Sn-125,Te-131M,Cs-134,Ac-228,Pa-234", "能量:809keV,核素:Co-58,Ga-72,Ge-77,Tc-96,Nb-96,Rh-1O6M,Sb-128,Sb-129,I-132,Eu-156,Pa-234", "能量:820keV,核素:Rh-106M,Ag-110M,Sn-125,Te-131,Cs-136,La-140,Pa-234", "能量:832keV,核素:Mn-54,Ga-72,Br-82,Kr-88,Sb-128,I-135,Ac-228,Pa-234", "能量:844keV,核素:Mn-56,Kr-87,Y-92,Nb-96,Rh-106M,Xe-125,Sb-128,Eu-152M", "能量:855keV,核素:Sb-126,Te-131M,I-133", "能量:867keV,核素:Nb-94,La-140,Eu-152,,Eu-156", "能量:879keV,核素:Ru-105,Sb-128,Sb-129,I-132,I-133,Ce-143,Tb-160,Pa-234", "能量:891keV,核素:Sc-46,Ga-72", "能量:902keV,核素:Y-88,Pa-234,Am-244", "能量:914keV,核素:Sn-125,Sb-129,Te-131M,Pm-148M,Pm-148,Ac-228", "能量:926keV,核素:Ge-77,Sr-91,La-140,Pa-234,Np-238", "能量:938keV,核素:Y-92,Ag-110M,Cd-115M", "能量:949keV,核素:Sr-92,Y-93,Eu-156,Pa-234", "能量:961keV,核素:Eu-152M,Eu-152,Eu-156,Tb-160,Ac-228", "能量:973keV,核素:Ga-72,,Ru-105,Sb-124,Sb-128,I-135,Ac-228", "能量:984keV,核素:Kr-88,Pa-234,Np-238", "能量:996keV,核素:Eu-154", "能量:1008keV,核素:Br-82,Eu-154", "能量:1020keV,核素:Sr-91,Zr-97,Nb-97,Rh-106M", "能量:1031keV,核素:Sb-126,Sb-129,Np-238", "能量:1043keV,核素:Br-82,Rh-102,Rh-106M,Sb-124,Sb-128,I-135", "能量:1055keV,核素:Ga-72,Te-131M", "能量:1066keV,核素:Sn-125,Eu-156", "能量:1078keV,核素:Rb-86,Sb-128,Eu-156", "能量:1090keV,核素:Ge-77,Tc-96,Nb-96,Sn-125,Eu-152", "能量:1102keV,核素:Fe-59,Rh-102,I-135", "能量:1113keV,核素:Zn-65,Ni-65,Rh-102,Sb-128,Eu-152,Tn-160", "能量:1125keV,核素:Sc-46,Br-76,Tc-96,Rh-106M,Te-131M,I-135,Ta-182", "能量:1137keV,核素:Kr-88,I-132", "能量:1148keV,核素:Zr-97,Te-131M,I-132", "能量:1160keV,核素:Sb-128,I-130", "能量:1172keV,核素:Co-60,Kr-87,I-132,Cs-134", "能量:1184keV,核素:Sb-128", "能量:1195keV,核素:Ge-77,Rh-106M,Tb-160", "能量:1207keV,核素:Te-131M", "能量:1219keV,核素:Br-76,As-76,Rh-106M,Ta-182", "能量:1230keV,核素:Ga-72,Br-76,As-76,Eu-156,Ta-182", "能量:1242keV,核素:Eu-156", "能量:1254keV,核素:Kr-88,Sb-128,Ta-182", "能量:1266keV,核素:Sb-129", "能量:1277keV,核素:Na-22,Ga-72,Eu-154,Eu-156", "能量:1289keV,核素:Ar-41,Fe-59,I-132,Ta-182", "能量:1301keV,核素:I-133,Eu-154", "能量:1312keV,核素:Tb-160", "能量:1324keV,核素:I-124,Sb-124", "能量:1336keV,核素:Co-60,Sb-128", "能量:1348keV,核素:Pa-234", "能量:1359keV,核素:Zr-97,Sb-124", "能量:1371keV,核素:Na-24,Ge-77,Kr-88,Sb-124,I-132,Eu-156", "能量:1383keV,核素:Br-76,Sr-92,Ag-110M", "能量:1395keV,核素:Rh-106M,I-132,Pa-234", "能量:1406keV,核素:Y-92,Eu-152", "能量:1418,核素:无", "能量:1430,核素:无", "能量:1441keV,核素:Sb-124,I-132", "能量:1453keV,核素:I - 135", "能量:1465keV,核素:K-40,Ga-72,Pm-148", "能量:1477keV,核素:Ni-65,Br-82,Ag-110M", "能量:1488,核素:无", "能量:1500keV,核素:Nb-96,I-135,Ac-228", "能量:1512keV,核素:I - 124", "能量:1523keV,核素:K-42,K-88,,Rh-106M", "能量:1535,核素:无", "能量:1547,核素:无", "能量:1559keV,核素:Ag - 110 M", "能量:1570keV,核素:Rh-106M,I-135", "能量:1582,核素:无", "能量:1594keV,核素:Ga-72,La-140,Eu-154", "能量:1605,核素:无", "能量:1617keV,核素:Bi - 212", "能量:1629keV,核素:Ac - 228", "能量:1641keV,核素:Te - 131 M", "能量:1652,核素:无", "能量:1664,核素:无", "能量:1676keV,核素:I - 135", "能量:1688keV,核素:I-124,Sb-124", "能量:1699,核素:无", "能量:1711keV,核素:I - 135", "能量:1723keV,核素:Rh106M", "能量:1734keV,核素:Sb - 129", "能量:1746keV,核素:Zr - 97", "能量:1758,核素:无", "能量:1770,核素:无", "能量:1781,核素:无", "能量:1793keV,核素:I - 135", "能量:1805,核素:无", "能量:1816,核素:无", "能量:1828,核素:无", "能量:1840keV,核素:Y - 88", "能量:1852keV,核素:Br - 76", "能量:1863keV,核素:Ga - 72", "能量:1875keV,核素:Eu - 156", "能量:1887keV,核素:Te - 131 M", "能量:1898,核素:无", "能量:1910,核素:无", "能量:1922keV,核素:Y-93,I-132", "能量:1934keV,核素:Eu - 156", "能量:1945,核素:无", "能量:1957,核素:无", "能量:1969keV,核素:Eu - 156", "能量:1980,核素:无", "能量:1992,核素:无", "能量:2004keV,核素:Sn-125,Te-131M,I-132", "能量:2016keV,核素:Kr - 87", "能量:2027keV,核素:Kr-88,Eu-156", "能量:2039keV,核素:Kr - 88", "能量:2051,核素:无", "能量:2062,核素:无", "能量:2074,核素:无", "能量:2086keV,核素:Sb - 124", "能量:2098keV,核素:Br-76,Eu-156", "能量:2109keV,核素:Mn-56,Ga-72,Br-76", "能量:2121,核素:无", "能量:2133,核素:无", "能量:2145,核素:无", "能量:2156,核素:无", "能量:2168,核素:无", "能量:2180keV,核素:Eu - 156", "能量:2191keV,核素:Kr-88,Eu-156", "能量:2203keV,核素:Ga - 72", "能量:2215,核素:无", "能量:2227keV,核素:Kr - 88", "能量:2238,核素:无", "能量:2250,核素:无", "能量:2262,核素:无", "能量:2273keV,核素:Eu - 156", "能量:2285,核素:无", "能量:2297,核素:无", "能量:2309,核素:无", "能量:2320,核素:无", "能量:2332,核素:无", "能量:2344,核素:无", "能量:2355,核素:无", "能量:2367,核素:无", "能量:2379,核素:无", "能量:2391keV,核素:Br-76,Kr-88", "能量:2402,核素:无", "能量:2414,核素:无", "能量:2426,核素:无", "能量:2438,核素:无", "能量:2449,核素:无", "能量:2461,核素:无", "能量:2473,核素:无", "能量:2484,核素:无", "能量:2496,核素:无", "能量:2508keV,核素:Ga-72,Br-76", "能量:2520keV,核素:Mn-56,La-140", "能量:2531,核素:无", "能量:2543,核素:无", "能量:2555keV,核素:Kr-87", "能量:2566,核素:无", "能量:2578,核素:无", "能量:2590,核素:无", "能量:2602,核素:无", "能量:2613,核素:无", "能量:2615,核素:无", "能量:2625,核素:无", "能量:2637,核素:无", "能量:2648,核素:无", "能量:2660,核素:无", "能量:2672,核素:无", "能量:2695,核素:无", "能量:2707,核素:无", "能量:2719,核素:无", "能量:2730,核素:无", "能量:2742,核素:无", "能量:2754keV,核素:Na - 24", "能量:2766,核素:无", "能量:2777,核素:无", "能量:2789keV,核素:Br - 76", "能量:2801,核素:无", "能量:2812,核素:无", "能量:2824,核素:无", "能量:2836,核素:无", "能量:2848,核素:无", "能量:2859,核素:无", "能量:2871,核素:无", "能量:2883,核素:无", "能量:2895,核素:无", "能量:2906,核素:无", "能量:2918,核素:无", "能量:2930,核素:无", "能量:2941,核素:无", "能量:2953keV,核素:Br - 76", "能量:2965,核素:无", "能量:2977,核素:无", "能量:2988,核素:无", "能量:3000,核素:无"]

export function indexToPinpuText(x) {
    return textArr[x + 1]
}


/**
 * Created by Wandergis on 2015/7/8.
 * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
 */

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
export function bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function gcj02tobd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
}

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat]
    }
}

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}

function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret
}

function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret
}

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}
