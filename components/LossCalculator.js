import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LossCalculator() {
  const router = useRouter();
  const [industry, setIndustry] = useState('');
  const [holiday, setHoliday] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [employees, setEmployees] = useState('');
  const [pcCount, setPcCount] = useState('');
  const [pcUsage, setPcUsage] = useState('');
  const [pcTasks, setPcTasks] = useState([]);
  const [equipment, setEquipment] = useState([]);

    // 📌 calculateLoss 関数を追加
    const calculateLoss = () => {
        console.log("Industry:", industry);
        console.log("PC Usage:", pcUsage);
        console.log("Equipment:", equipment);
        let baseLoss = {
          "製造業": 600000,
          "IT・通信": 120000,
          "小売・流通": 300000,
          "医療・福祉": 600000,
          "教育": 120000,
          "飲食": 300000,
          "サービス業": 120000,
          "その他": 120000
        }[industry] || 120000;
    
        let loss = baseLoss;
    
        let pcUsageMultiplier = {
          "1時間未満": 1.0,
          "3時間未満": 1.2,
          "5時間未満": 1.5,
          "5時間以上": 2.0
        }[pcUsage] || 1.0;
    
        loss *= pcUsageMultiplier;
    
        let equipmentImpact = {
          "電話": 0.05,
          "FAX": 0.03,
          "防犯カメラ": 0.02,
          "レジ": 0.10,
          "VPN": 0.08,
          "その他": 0.05
        };
    
        let equipmentMultiplier = equipment.reduce((acc, item) => acc + (equipmentImpact[item] || 0), 0);
    loss *= (1 + equipmentMultiplier);

    console.log("Final Loss:", loss);
    return Math.round(loss).toLocaleString();
};
    
      // 📌 handleSubmit を修正
      const handleSubmit = () => {
        const lossAmount = calculateLoss();
        router.push({
          pathname: '/result',
          query: {
            industry,
            loss: lossAmount,
            holiday,
            workHours,
            employees,
            pcCount,
            pcUsage,
            pcTasks: pcTasks.join(','),
            equipment: equipment.join(','),
          },
        });
      };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-5xl font-bold text-center py-6 bg-gray-200 border-b-4 border-gray-400 shadow-md mb-10">
        ⚡ 回線停止の影響診断 ⚡
      </h1>

      {/* ① 業種 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">① 業種</label>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {['製造業', 'IT・通信', '小売・流通', '医療・福祉', '教育', '飲食', 'サービス業', 'その他'].map((option) => (
            <button key={option} onClick={() => setIndustry(option)}
              className={`px-6 py-2 rounded-md border-2 font-bold transition-all 
                ${industry === option ? 'bg-black text-white border-white shadow-lg' 
                                      : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ② 休日 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">② 休日</label>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {['土日祝休み', '週1休み', '隔週土曜日・日曜日休み', '年中無休'].map((option) => (
            <button key={option} onClick={() => setHoliday(option)}
              className={`px-6 py-2 w-full rounded-md border-2 font-bold transition-all 
                ${holiday === option ? 'bg-black text-white border-white shadow-lg' 
                                     : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ③ 営業時間 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">③ 営業時間</label>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {['8時間', '10時間', '12時間', '24時間'].map((option) => (
            <button key={option} onClick={() => setWorkHours(option)}
              className={`px-6 py-2 w-full rounded-md border-2 font-bold transition-all 
                ${workHours === option ? 'bg-black text-white border-white shadow-lg' 
                                       : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ④ 従業員 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">④ 従業員</label>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {['3人未満', '5人未満', '10人未満', '20人未満', '20人以上'].map((option) => (
            <button key={option} onClick={() => setEmployees(option)}
              className={`px-6 py-2 w-full rounded-md border-2 font-bold transition-all 
                ${employees === option ? 'bg-black text-white border-white shadow-lg' 
                                       : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ⑤ PC台数 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">⑤ PC台数</label>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {['5台未満', '10台未満', '20台未満', '20台以上'].map((option) => (
            <button key={option} onClick={() => setPcCount(option)}
              className={`px-6 py-2 w-full rounded-md border-2 font-bold transition-all 
                ${pcCount === option ? 'bg-black text-white border-white shadow-lg' 
                                     : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* ⑥ PC作業時間 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">⑥ PC作業時間</label>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {['1時間未満', '3時間未満', '5時間未満', '5時間以上'].map((option) => (
            <button key={option} onClick={() => setPcUsage(option)}
              className={`px-6 py-2 w-full rounded-md border-2 font-bold transition-all 
                ${pcUsage === option ? 'bg-black text-white border-white shadow-lg' 
                                     : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {option}
            </button>
          ))}
        </div>
      </div>

       {/* ⑦ PCで行っている作業 */}
       <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">⑦ PCで行っている作業</label>
        <div className="text-sm text-red-500 mt-2">※ すべて選んでください</div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          {['メール', '業務報告', 'ネットバンキング', 'Web会議', 'グループチャット', '給与計算', '勤怠管理', '受発注', 'その他'].map((task) => (
            <button 
              key={task} 
              onClick={() => setPcTasks(pcTasks.includes(task) ? pcTasks.filter(t => t !== task) : [...pcTasks, task])}
              className={`w-full px-6 py-2 rounded-md border-2 font-bold transition-all text-center
                ${pcTasks.includes(task) ? 'bg-black text-white border-white shadow-lg' 
                                         : 'bg-transparent text-black border-black hover:bg-gray-200'}`}
            >
              {task}
            </button>
          ))}
        </div>
      </div>

      {/* ⑧ 既存設備 */}
      <div className="mb-10">
        <label className="text-2xl font-bold text-gray-700 border-b-2 pb-2 block">⑧ 既存設備</label>
        <div className="text-sm text-red-500 mt-2">※ すべて選んでください</div>

        {/* 1行目（電話, FAX, 防犯カメラ） */}
        <div className="grid grid-cols-3 gap-4 mt-4 w-full">
          {['電話', 'FAX', '防犯カメラ'].map((eq) => (
            <button key={eq} onClick={() => setEquipment(equipment.includes(eq) ? equipment.filter(e => e !== eq) : [...equipment, eq])}
              className={`w-full px-6 py-3 rounded-md border-2 font-bold transition-all
                ${equipment.includes(eq) ? 'bg-black text-white border-white shadow-lg' 
                                         : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {eq}
            </button>
          ))}
        </div>

        {/* 2行目（レジ, VPN, その他） */}
        <div className="grid grid-cols-3 gap-4 mt-4 w-full">
          {['レジ', 'VPN', 'その他'].map((eq) => (
            <button key={eq} onClick={() => setEquipment(equipment.includes(eq) ? equipment.filter(e => e !== eq) : [...equipment, eq])}
              className={`w-full px-6 py-3 rounded-md border-2 font-bold transition-all
                ${equipment.includes(eq) ? 'bg-black text-white border-white shadow-lg' 
                                         : 'bg-transparent text-black border-black hover:bg-gray-200'}`}>
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* 試算ボタン */}
      <div className="text-center mt-12">
        <button 
          onClick={handleSubmit}
          className="px-10 py-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-2xl"
        >
          🔍 試算する
        </button>
      </div>
    </div>
  );
}

