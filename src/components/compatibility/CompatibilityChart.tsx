import React from 'react';

interface CompatibilityChartProps {
  compatibilityData: any;
  type1: string;
  type2: string;
  type1Color: string;
  type2Color: string;
}

const CompatibilityChart: React.FC<CompatibilityChartProps> = ({ 
  compatibilityData, 
  type1, 
  type2,
  type1Color,
  type2Color 
}) => {
  // 添加空值检查
  if (!compatibilityData) {
    return null;
  }
  
  // 获取函数对
  const functionPairs = Object.keys(compatibilityData);
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type1Color }}></div>
          <span className="ml-2 font-medium">{type1}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 font-medium">{type2}</span>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: type2Color }}></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {functionPairs.map(pair => {
          const data = compatibilityData[pair];
          const score = data.score;
          
          // 根据分数计算宽度
          const barWidth = `${score}%`;
          
          // 根据分数确定颜色
          const getBarColor = (score: number) => {
            if (score >= 90) return 'bg-green-500';
            if (score >= 75) return 'bg-blue-500';
            if (score >= 60) return 'bg-yellow-500';
            return 'bg-red-500';
          };
          
          const barColor = getBarColor(score);
          
          return (
            <div key={pair} className="mb-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">{pair.replace('_', ' & ')}</span>
                <span className="text-sm font-medium text-gray-900">{score}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${barColor} rounded-full transition-all duration-1000`} 
                  style={{ width: barWidth }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 图例 */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>优秀 (90-100%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>良好 (75-89%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span>一般 (60-74%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>具有挑战性 (&lt;60%)</span>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityChart;