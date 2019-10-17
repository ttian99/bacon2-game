var xlsx = require('xlsx');
var fs = require('fs');
var path = require('path');

/** 获取表格的数量 */
function getSheetLen(sheet, total, key) {
    total = total || 2000;
    key = key || 'A';
    for (let i = 2; i < total; i++) {
        var value = getCellValue(sheet, key, i);
        if (!value) return i - 1;
    }
}
/** 获取每个单元格的值 */
function getCellValue(sheet, col, row) {
    return sheet[col + row] ? sheet[col + row].v : '';
}
/**
 * 导出游戏配置
 */
function exportJson(fileName, data) {
    const filePath = path.join(Editor.Project.path, 'doc', fileName + '.json');
    fs.writeFileSync(filePath, JSON.stringify(data), {
        encoding: 'utf8'
    });
}

/** 读取excel文件以及sheet表格 */
function readSheet(filePath, sheetName) {
    var workBook = xlsx.readFile(filePath);
    var sheet = workBook.Sheets[sheetName];
    return sheet;
}

function getBaconList() {
    const FILE_PATH = path.join(Editor.Project.path, '/doc/配置表.xlsx');
    const SHEET_NAME = '肉配置详情';
    const sheet = readSheet(FILE_PATH, SHEET_NAME);
    // 作物    
    let baconList = {};
    const len = getSheetLen(sheet, 200);
    Editor.log('baconList len = ' + len);
    // Editor.log('len = ' + len);
    for (let i = 2; i <= len; i++) {
        let data = {};
        const level = getCellValue(sheet, 'A', i);
        data.name = getCellValue(sheet, 'C', i);
        data.rate = Math.round(getCellValue(sheet, 'S', i));
        data.coin = Math.round(getCellValue(sheet, 'U', i));
        data.time = Number(Number(getCellValue(sheet, 'V', i)).toFixed(3));
        data.giftLevel = getCellValue(sheet, 'Y', i);
        data.coinBuyMaxLevel = getCellValue(sheet, 'Z', i);
        data.diamonBuyMaxLevel = getCellValue(sheet, 'AI', i);
        data.coinPrice = getCellValue(sheet, 'AA', i);
        data.coefficient = getCellValue(sheet, 'AC', i);
        data.diamonPrice = getCellValue(sheet, 'AJ', i);
        data.exp = getCellValue(sheet, 'AG', i);
        data.shareRewardDiamon = getCellValue(sheet, 'AH', i);
        baconList[level] = data;

    }
    exportJson('baconList', baconList);
    Editor.success('export baconList success');
}

function getHandList() {
    const FILE_PATH = path.join(Editor.Project.path, '/doc/配置表.xlsx');
    const SHEET_NAME = '手锅体力设置';
    const sheet = readSheet(FILE_PATH, SHEET_NAME);
    // 作物    
    let list = {};
    // const len = getSheetLen(sheet);
    const len = 13;
    Editor.log('handList len = ' + len);
    for (let i = 3; i <= len + 1; i++) {
        let data = {};
        const id = getCellValue(sheet, 'A', i);
        data.name = getCellValue(sheet, 'B', i);
        data.unlockLevel = Number(getCellValue(sheet, 'C', i));
        data.desc = getCellValue(sheet, 'D', i);
        data.rarity = Number(getCellValue(sheet, 'E', i));
        data.fragment = Number(getCellValue(sheet, 'F', i));
        data.super = getCellValue(sheet, 'G', i);
        data.extraExp = Number(getCellValue(sheet, 'H', i));
        data.energyRecovery = Number(getCellValue(sheet, 'I', i));
        // data.extraExp = getCellValue(sheet, 'J', i);
        // data.extraExp = getCellValue(sheet, 'K', i);
        // data.extraExp = getCellValue(sheet, 'L', i);
        // data.extraExp = getCellValue(sheet, 'M', i);
        list[id] = data;
    }
    exportJson('handList', list);
    Editor.success('export handList success');
}

function getBoardList() {
    const FILE_PATH = path.join(Editor.Project.path, '/doc/配置表.xlsx');
    const SHEET_NAME = '手锅体力设置';
    const sheet = readSheet(FILE_PATH, SHEET_NAME);
    // 作物    
    let list = {};
    // const len = getSheetLen(sheet);
    const len = 16;
    Editor.log('boardList len = ' + len);
    for (let i = 26; i <= 26 + len; i++) {
        let data = {};
        const id = getCellValue(sheet, 'A', i);
        data.name = getCellValue(sheet, 'B', i);
        data.unlockLevel = Number(getCellValue(sheet, 'C', i));
        data.desc = getCellValue(sheet, 'D', i);
        data.rarity = Number(getCellValue(sheet, 'E', i));
        data.fragment = Number(getCellValue(sheet, 'F', i));
        data.super = getCellValue(sheet, 'G', i);
        data.extraCoin = Number(getCellValue(sheet, 'H', i));
        data.energyLimit = Number(getCellValue(sheet, 'I', i));
        // data.extraExp = getCellValue(sheet, 'J', i);
        // data.extraExp = getCellValue(sheet, 'K', i);
        // data.extraExp = getCellValue(sheet, 'L', i);
        // data.extraExp = getCellValue(sheet, 'M', i);
        list[id] = data;
    }
    Editor.info(list);
    exportJson('boardList', list);
    Editor.success('export boardList success');
}

function getConfig() {
    try {
        getBaconList();
        getHandList();
        getBoardList();
    } catch (error) {
        Editor.error(error);
    }
}

module.exports = getConfig;
