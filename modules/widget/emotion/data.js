define(function (require) {

    //默认表情
    var defaultData = [
        ["呵呵", "001.gif"],
        ["哈哈", "002.gif"],
        ["泪", "003.gif"],
        ["糗", "004.gif"],
        ["偷笑", "005.gif"],
        ["可爱", "006.gif"],
        ["得意", "007.gif"],
        ["色", "008.gif"],
        ["难过", "009.gif"],
        ["鼓掌", "010.gif"],
        ["疑问", "011.gif"],
        ["吐", "012.gif"],
        ["顶", "013.gif"],
        ["发怒", "014.gif"],
        ["奋斗", "015.gif"],
        ["害羞", "016.gif"],
        ["抓狂", "017.gif"],
        ["晕", "018.gif"],
        ["衰", "019.gif"],
        ["抱拳", "020.gif"],
        ["握手", "021.gif"],
        ["耶", "022.gif"],
        ["good", "023.gif"],
        ["差劲", "024.gif"],
        ["OK", "025.gif"],
        ["鞭炮", "026.gif"],
        ["钞票", "027.gif"],
        ["吃饭", "028.gif"],
        ["灯泡", "029.gif"],
        ["喝茶", "030.gif"],
        ["猴", "031.gif"],
        ["熊猫", "032.gif"],
        ["啤酒", "033.gif"],
        ["闪电", "034.gif"],
        ["双喜", "035.gif"],
        ["雪花", "036.gif"],
        ["夜晚", "037.gif"],
        ["拥抱", "038.gif"],
        ["蛋糕", "039.gif"],
        ["心", "040.gif"],
        ["心碎", "041.gif"],
        ["玫瑰", "042.gif"],
        ["礼物", "043.gif"],
        ["太阳", "044.gif"],
        ["威武", "045.gif"],
        ["I LOVE MY TEAM", "046.gif"]

    ];

    //明道熊
    var bearData = [
        ["嗨", "01.png"],
        ["哈哈", "02.png"],
        ["害羞", "03.png"],
        ["傲娇", "04.png"],
        ["得意", "05.png"],
        ["偷笑", "06.png"],
        ["酷", "07.png"],
        ["奔泪", "08.png"],
        ["可怜", "09.png"],
        ["花心", "10.png"],
        ["加油", "11.png"],
        ["怀疑", "12.png"],
        ["囧", "13.png"],
        ["灵感", "14.png"],
        ["牛逼", "15.png"],
        ["生气", "16.png"],
        ["纳尼", "17.png"],
        ["恶心", "18.png"],
        ["流汗", "19.png"],
        ["疑问", "20.png"],
        ["郁闷", "21.png"],
        ["晕", "22.png"],
        ["震惊", "23.png"],
        ["哈哈", "24.png"],
    ];

    //emoji 表情
    var emojiData = [
        //人物
        //===============================================================
        ["emj 笑脸", "A001.png"],
        ["emj 龇牙", "A002.png"],
        ["emj 破涕为笑", "A003.png"],
        ["emj 哈哈", "A004.png"],
        ["emj 开心", "A005.png"],
        ["emj 惬意", "A006.png"],
        ["emj 挤眼", "A007.png"],
        ["emj 得意", "A008.png"],
        ["emj 色", "A009.png"],
        ["emj 吐舌", "A010.png"],
        ["emj 鬼脸", "A011.png"],
        ["emj 亲亲", "A012.png"],
        ["emj 飞吻", "A013.png"],
        ["emj 呆", "A014.png"],
        ["emj 生气", "A015.png"],
        ["emj 大怒", "A016.png"],
        ["emj 斜眼", "A017.png"],
        ["emj 不开心", "A018.png"],
        ["emj 犯错了", "A019.png"],
        ["emj 汗", "A020.png"],
        ["emj 鼻涕", "A021.png"],
        ["emj 痛苦", "A022.png"],
        ["emj 痛不欲生", "A023.png"],
        ["emj 大哭", "A024.png"],
        ["emj 挂了", "A025.png"],
        ["emj 糗", "A026.png"],
        ["emj 糗大了", "A027.png"],
        ["emj 惊恐", "A028.png"],
        ["emj 病了", "A029.png"],
        ["emj 恶魔", "A030.png"],
        ["emj 外星人", "A031.png"],
        ["emj 骷髅", "A032.png"],
        ["emj 鬼", "A033.png"],
        ["emj 雪人", "A034.png"],
        ["emj 南瓜头", "A035.png"],
        ["emj 便便", "A036.png"],
        ["emj 男孩", "A037.png"],
        ["emj 女孩", "A038.png"],
        ["emj 北鼻", "A039.png"],
        ["emj 公主", "A040.png"],
        ["emj 工头", "A041.png"],
        ["emj 砖工", "A042.png"],
        ["emj 圣诞老人", "A043.png"],
        ["emj 天使", "A044.png"],
        ["emj 爱爱", "A045.png"],
        ["emj 牵手", "A046.png"],
        ["emj 嘴唇", "A047.png"],
        ["emj 如来神掌", "A048.png"],
        ["emj 拳头", "A049.png"],
        ["emj 拇指", "A050.png"],
        ["emj NO", "A051.png"],
        ["emj 耶", "A052.png"],
        ["emj 肌肉", "A053.png"],
        ["emj 鼻子", "A054.png"],
        ["emj 耳朵", "A055.png"],
        ["emj 鼓掌", "A056.png"],
        ["emj 摊手", "A057.png"],
        ["emj OK", "A058.png"],
        //大自然
        //==========================================================================
        ["emj 鼠", "B001.png"],
        ["emj 牛", "B002.png"],
        ["emj 虎", "B003.png"],
        ["emj 兔", "B004.png"],
        ["emj 龙", "B005.png"],
        ["emj 蛇", "B006.png"],
        ["emj 马", "B007.png"],
        ["emj 羊", "B008.png"],
        ["emj 猴", "B009.png"],
        ["emj 鸡", "B010.png"],
        ["emj 狗", "B011.png"],
        ["emj 猪", "B012.png"],
        ["emj 毛毛虫", "B013.png"],
        ["emj 猫", "B014.png"],
        ["emj 青蛙", "B015.png"],
        ["emj 小唧", "B016.png"],
        ["emj 鱼", "B017.png"],
        ["emj 章鱼", "B018.png"],
        ["emj 仙人掌", "B019.png"],
        ["emj 四叶草", "B020.png"],
        ["emj 叶子", "B021.png"],
        ["emj 落叶", "B022.png"],
        ["emj 枫叶", "B023.png"],
        ["emj 向日葵", "B024.png"],
        ["emj 花", "B025.png"],
        ["emj 郁金香", "B026.png"],
        ["emj 太阳", "B027.png"],
        ["emj 月亮", "B028.png"],
        ["emj 星星", "B029.png"],
        ["emj 闪电", "B030.png"],
        ["emj 火", "B031.png"],
        ["emj 云", "B032.png"],
        ["emj 大风", "B033.png"],
        ["emj 汗水", "B034.png"],
        ["emj 下雨", "B035.png"],
        ["emj 流星", "B036.png"],
        ["emj 彩虹", "B037.png"],
        ["emj 朝阳", "B038.png"],
        ["emj 落日", "B039.png"],
        //食物
        //=========================================
        ["emj 苹果", "C001.png"],
        ["emj 橘子", "C002.png"],
        ["emj 草莓", "C003.png"],
        ["emj 西瓜", "C004.png"],
        ["emj 番茄", "C005.png"],
        ["emj 茄子", "C006.png"],
        ["emj 米饭", "C007.png"],
        ["emj 面条", "C008.png"],
        ["emj 便当", "C009.png"],
        ["emj 蛋糕", "C010.png"],
        ["emj 汉堡", "C011.png"],
        ["emj 薯条", "C012.png"],
        ["emj 冰激凌", "C013.png"],
        ["emj 刨冰", "C014.png"],
        ["emj 咖啡", "C015.png"],
        ["emj 啤酒", "C016.png"],
        ["emj 香烟", "C017.png"],

        //庆祝
        //=============================================
        ["emj 礼物", "D001.png"],
        ["emj 生日蛋糕", "D002.png"],
        ["emj 鲜花", "D003.png"],
        ["emj 圣诞树", "D004.png"],
        ["emj 皇冠", "D005.png"],
        ["emj 彩带", "D006.png"],
        ["emj 气球", "D007.png"],
        ["emj 闪光", "D008.png"],
        ["emj 蝴蝶结", "D009.png"],
        ["emj 好心情", "D010.png"],
        ["emj 心", "D011.png"],
        ["emj 一剑穿心", "D012.png"],

        //活动
        //================================================
        ["emj 步行", "E001.png"],
        ["emj 跑步", "E002.png"],
        ["emj 跳舞", "E003.png"],
        ["emj 游泳", "E004.png"],
        ["emj 沐浴", "E005.png"],
        ["emj 自行车", "E006.png"],
        ["emj 竞赛", "E007.png"],
        ["emj 奖杯", "E008.png"],
        ["emj 赛马", "E009.png"],
        ["emj 钓鱼", "E010.png"],
        ["emj 高尔夫", "E011.png"],
        ["emj 网球", "E012.png"],
        ["emj 足球", "E013.png"],
        ["emj 篮球", "E014.png"],
        ["emj 桌球", "E015.png"],
        ["emj 飞镖", "E016.png"],
        ["emj 美甲", "E017.png"],
        ["emj 按摩", "E018.png"],
        ["emj 剪发", "E019.png"],
        ["emj K歌", "E020.png"],
        ["emj 萨克斯", "E021.png"],
        ["emj 吉他", "E022.png"],
        ["emj 喇叭", "E023.png"],

        //物体和符号
        //==================================================
        ["emj 手机", "F001.png"],
        ["emj 传真机", "F002.png"],
        ["emj 计算机", "F003.png"],
        ["emj 电视机", "F004.png"],
        ["emj 电话", "F005.png"],
        ["emj 相机", "F006.png"],
        ["emj 摄像机", "F007.png"],
        ["emj 房子", "F008.png"],
        ["emj 汽车", "F009.png"],
        ["emj 卡车", "F010.png"],
        ["emj 公交车", "F011.png"],
        ["emj 高铁", "F012.png"],
        ["emj 飞机", "F013.png"],
        ["emj 火箭", "F014.png"],
        ["emj T恤", "F015.png"],
        ["emj 皮鞋", "F016.png"],
        ["emj 帽子", "F017.png"],
        ["emj 连衣裙", "F018.png"],
        ["emj 包包", "F019.png"],
        ["emj 口红", "F020.png"],
        ["emj 比基尼", "F021.png"],
        ["emj 高跟鞋", "F022.png"],
        ["emj 雨伞", "F023.png"],
        ["emj 钻戒", "F024.png"],
        ["emj 钻石", "F025.png"],
        ["emj 铃铛", "F026.png"],
        ["emj 扩音器", "F027.png"],
        ["emj 灯泡", "F028.png"],
        ["emj 钥匙", "F029.png"],
        ["emj 锁", "F030.png"],
        ["emj 放大镜", "F031.png"],
        ["emj 刀叉", "F032.png"],
        ["emj 剪刀", "F033.png"],
        ["emj 药丸", "F034.png"],
        ["emj 打针", "F035.png"],
        ["emj 手枪", "F036.png"],
        ["emj 手雷", "F037.png"],
        ["emj 书", "F038.png"],
        ["emj 绘画", "F039.png"],
        ["emj 音乐", "F040.png"],
        ["emj 睡觉", "F041.png"],
        ["emj 钱", "F042.png"],
        ["emj 股票", "F043.png"],
        ["emj VS", "F044.png"],
        ["emj 祝福", "F045.png"],
        ["emj 麻将", "F046.png"],
        ["emj 红心", "F047.png"],
        ["emj 黑桃", "F048.png"],
        ["emj 警告", "F049.png"],
        ["emj 18禁", "F050.png"],
        ["emj 足迹", "F051.png"],
        ["emj 叹号", "F052.png"],
        ["emj 问号", "F053.png"],
        ["emj O", "F054.png"],
        ["emj X", "F055.png"],
        ["emj 怒", "F056.png"],


    ];

    var emotionData = [
        {
            "tab": {
                "name": "历史",
                "emotionClass": "emotion-history"
            },
            "content": []
        },
        {
            "tab": {
                "name": "表情",
                "emotionClass": "emotion-face",
                "path": "default/"
            },
            "content": []
        },
        {
            "tab": {
                "name": "明道萌熊",
                "emotionClass": "emotion-bear",
                "path": "bear/"
            },
            "content": []
        },
        {
            "tab": {
                "name": "emoji",
                "emotionClass": "emoji",
                "text": "emoji",
                "path": "emoji/"
            },
            "content": []
        }
    ];
    //表情转换
    //===========================================================
    (function (emotions) {
        for (var i = 0; i < emotions.length; i++) {
            for (var j = 0; j < emotions[i].length; j++) {
                var common = emotions[i][j];
                emotions[i][j] = {
                    "key": common[0],
                    "img": common[1]
                }
            }
        }
        defaultData = emotions[0];
        bearData = emotions[1];
        emojiData = emotions[2];
    })([defaultData, bearData, emojiData]);


    emotionData[1].content = defaultData;
    emotionData[2].content = bearData;
    emotionData[3].content = emojiData;

    return emotionData;
});