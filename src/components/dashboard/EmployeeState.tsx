import { Users, UserCheck, UserX } from 'lucide-react';
import { EmployeeStats as Stats } from '../../types/employee';

interface EmployeeStatsProps {
  stats: Stats;
}

export const EmployeeStats = ({ stats }: EmployeeStatsProps) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      title: 'Active Employees',
      value: stats.active,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      title: 'Inactive Employees',
      value: stats.inactive,
      icon: UserX,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon size={28} className={card.textColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
