import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const [loss, setLoss] = useState(null);
  const [continuousLoss, setContinuousLoss] = useState(null); // 継続損失

  useEffect(() => {
    if (router.isReady) {
      console.log("🚀 Received Loss from query:", router.query.loss);

      const parsedLoss = router.query.loss ? Number(router.query.loss.replace(/,/g, '')) : 0;
      setLoss(parsedLoss);
      setContinuousLoss(Math.round(parsedLoss * 0.24)); // 24% の継続損失を計算
    }
  }, [router.isReady]);

  return (
    <div className="p-12 max-w-6xl mx-auto bg-white rounded-lg shadow-md text-center">
      {/* **タイトル** */}
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 bg-gray-200 py-4 shadow-md rounded-lg">
         回線停止のリスク試算結果
      </h1>

      {/* **損失金額の表示** */}
      <p className="text-lg font-bold text-gray-600">6時間停止の場合想定される損失金額</p>
      <p className="text-5xl font-extrabold text-red-600">
        {loss !== null ? `${loss.toLocaleString()} 円` : "計算中..."}
      </p>

      {/* **継続損失の表示（追加）** */}
      <p className="mt-4 text-lg font-bold text-gray-600">その後の企業信用低下における継続損失（1カ月あたり）</p>
      <p className="text-4xl font-extrabold text-orange-600">
        {continuousLoss !== null ? `${continuousLoss.toLocaleString()} 円` : "計算中..."}
      </p>

      {/* **リスクレベルの表示** */}
      <p className="mt-4">
        <span className="bg-yellow-400 text-black text-lg font-bold px-4 py-2 rounded-lg">
          {loss !== null ? `リスクレベル ${getRiskLevel(loss)}` : ""}
        </span>
      </p>

      {/* **試算結果のメッセージ（改善版）** */}
      <div className="mt-6 p-6 bg-red-100 border-l-8 border-red-500 rounded-lg shadow-md">
        <p className="text-2xl font-bold text-red-700">
          {loss !== null ? getRiskMessage(loss) : ""}
        </p>
      </div>

      {/* **補足説明（追加部分）** */}
      <div className="mt-6 p-4 bg-gray-100 border-l-4 border-gray-400 rounded-md shadow-sm text-left">
        <p className="text-lg text-gray-800">
          {loss !== null ? getRiskDetail(loss) : ""}
        </p>
      </div>

      {/* **注意書き（参考値の説明）** */}
<p className="text-sm text-gray-500 mt-6">
  ※ この試算結果は、想定される条件に基づく概算値であり、実際の損害額を保証するものではありません。
</p>

      {/* **ホームに戻るボタン** */}
      <div className="mt-10">
        <button
          onClick={() => router.push('/')}
          className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all text-xl"
        >
          ホームに戻る
        </button>
      </div>

    </div>

  );
}

// **リスクレベル判定**
const getRiskLevel = (loss) => {
  if (loss < 50000) return "5";
  if (loss < 300000) return "6";
  if (loss < 800000) return "7";
  if (loss < 1500000) return "8";
  return "9";
};

// **試算結果のメッセージ**
const getRiskMessage = (loss) => {
  if (loss < 50000) return "⚠️ 油断は禁物！回線トラブルはいつでも起こる";
  if (loss < 300000) return "⚠️ 業務の遅延リスク大！取引先にも影響が及ぶ可能性";
  if (loss < 800000) return "⛔ 社内業務ストップ！事業継続が困難なレベル";
  if (loss < 1500000) return "🚨 会社の信用に直結！回線トラブルが経営課題に";
  return "💀 事業停止レベル！一度の回線トラブルが致命傷に";
};

// **補足情報を表示**
const getRiskDetail = (loss) => {
  if (loss < 50000) return `
    回線停止が長引くと、業務遅延や顧客対応のトラブルにつながり、現状でも大きな損失に繋がる可能性があります。
    特に、社内のネットワーク依存度が高まる中、今のままでは緊急時に迅速な対応ができない恐れがあります。
    今のうちに、バックアップ手段を確保し、社内の対応フローを明確にしておく必要があります。
  `;
  if (loss < 300000) return `
    回線が停止すると、メールや業務システムが使えなくなり、社内業務が滞るだけでなく、取引先への対応も大きく遅れる可能性があります。
    特に、受発注や決済がオンラインに依存している場合、対応が遅れることで信用問題に発展する恐れもあります。
    早急に代替手段を準備する必要があります。
  `;
  if (loss < 800000) return `
    回線が止まると、業務のほとんどが機能しなくなり、従業員の生産性が大幅に低下します。
    ネットワークが使えなくなることで、意思決定が遅れ、会社全体の動きが鈍化します。
    この状態が続くと、取引先からの信用を失い、事業継続自体が困難になる恐れも。
    早急に代替手段を準備する必要があります。
  `;
  if (loss < 1500000) return `
    通信環境の不備が原因で、業務の遅延や顧客対応の停止が発生。
    従業員が仕事を進められないだけでなく、顧客・取引先への対応も滞り、会社の信用問題に直結します。
    特に、決済や顧客情報管理をオンラインで行っている場合、顧客クレームの発生リスクが大きくなります。
    早急に代替手段を準備する必要があります。
  `;
  return `
    現在の業務環境では、回線が止まると業務が完全に停止し、売上にも深刻な影響が出るレベルです。
    リアルタイム性が求められる業種は、取引先や顧客に与える影響が計り知れません。
    回線停止が長引けば、顧客離れ・売上減少・企業の信頼失墜につながる可能性が高くなります。
    「大規模なシステム障害が起きたらどうするのか？」今すぐ対策を検討するべきです。
    早急に代替手段を準備する必要があります。
  `;
};









