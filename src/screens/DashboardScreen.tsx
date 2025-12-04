import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Bell, User, ArrowUpRight, ArrowDownRight, Target, Wallet, CreditCard, Zap, TrendingUp, PiggyBank } from 'lucide-react-native';
import { BarChart } from 'react-native-gifted-charts';
import ScreenWrapper from '../components/ScreenWrapper';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { useTheme } from '../context/ThemeContext';
import { useBudget } from '../context/BudgetContext';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
    const { theme, colors } = useTheme();
    const { balance, totalIncome, totalExpenses } = useBudget();
    const isDark = theme === 'dark';

    const formatCurrency = (amount: number) => {
        return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    // Mock Data for Charts
    const barData = [
        { value: 1300, label: 'EXP', frontColor: colors.expense, gradientColor: '#fb7185' },
        { value: 1600, label: 'BILLS', frontColor: colors.secondary, gradientColor: '#c084fc' },
        { value: 500, label: 'DEBT', frontColor: colors.warning, gradientColor: '#fb923c' },
        { value: 0, label: 'GOALS', frontColor: colors.info, gradientColor: '#60a5fa' },
        { value: 500, label: 'SAVE', frontColor: colors.success, gradientColor: '#4ade80' },
        { value: 600, label: 'INV', frontColor: colors.primary, gradientColor: '#818cf8' },
    ];

    const categoryLimits = [
        { name: 'Eating Out', spent: 215, limit: 200, color: colors.expense },
        { name: 'Shopping', spent: 160, limit: 150, color: colors.expense },
        { name: 'Fuel', spent: 145, limit: 150, color: colors.warning },
        { name: 'Groceries', spent: 480, limit: 500, color: colors.warning },
        { name: 'Miscellaneous', spent: 95, limit: 100, color: colors.warning },
        { name: 'Personal Care', spent: 75, limit: 80, color: colors.warning },
        { name: 'Gifts', spent: 80, limit: 100, color: colors.warning },
    ];

    return (
        <ScreenWrapper>
            <ScrollView className="flex-1 px-4 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row justify-between items-center py-4">
                    <View>
                        <Text className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                            January
                        </Text>
                        <View className="flex-row items-center">
                            <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {getGreeting()}
                            </Text>
                            <Text className="text-2xl ml-2">👋</Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="p-3 rounded-full bg-white/5 border border-white/10">
                            <Bell size={20} color={isDark ? '#94a3b8' : '#64748b'} />
                            <View className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-11 h-11 rounded-full bg-yellow-500/20 border border-yellow-500/50 items-center justify-center">
                            <Text className="text-yellow-500 font-bold text-lg">D</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hero Card - Left to Spend */}
                <View>
                    <GlassCard className="mt-2" intensity={40} variant="highlight">
                        <View className="items-center py-2">
                            <View className="flex-row items-center gap-2 mb-2">
                                <Wallet size={16} color={colors.text} style={{ opacity: 0.7 }} />
                                <Text className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Left to Spend
                                </Text>
                            </View>

                            <Text className={`text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6`}>
                                {formatCurrency(balance)}
                            </Text>

                            <View className="flex-row w-full justify-between mb-6 px-2">
                                <View className="bg-white/5 rounded-2xl p-3 flex-1 mr-2 border border-white/5">
                                    <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Daily Safe Spend</Text>
                                    <View className="flex-row items-center">
                                        <TrendingUp size={14} color={colors.success} />
                                        <Text className="text-white font-bold text-lg ml-1">$0</Text>
                                    </View>
                                </View>
                                <View className="bg-white/5 rounded-2xl p-3 flex-1 ml-2 border border-white/5">
                                    <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Days Left</Text>
                                    <View className="flex-row items-center">
                                        <Target size={14} color={colors.warning} />
                                        <Text className="text-white font-bold text-lg ml-1">27</Text>
                                    </View>
                                </View>
                            </View>

                            <View className="w-full px-1">
                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-gray-400 text-xs font-medium">100% Spent</Text>
                                    <Text className="text-gray-400 text-xs font-medium">$6,197.00 / $4,400.00</Text>
                                </View>
                                <ProgressBar progress={1} color={colors.expense} height={8} trackColor="rgba(255,255,255,0.05)" />
                            </View>
                        </View>
                    </GlassCard>
                </View>

                {/* Quick Stats */}
                <View className="flex-row gap-3 mt-4">
                    <GlassCard className="flex-1 items-center py-3 px-2">
                        <View className="w-8 h-8 rounded-full bg-emerald-500/20 items-center justify-center mb-2">
                            <ArrowDownRight size={16} color={colors.success} />
                        </View>
                        <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">Income</Text>
                        <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            $4.4K
                        </Text>
                    </GlassCard>
                    <GlassCard className="flex-1 items-center py-3 px-2">
                        <View className="w-8 h-8 rounded-full bg-rose-500/20 items-center justify-center mb-2">
                            <ArrowUpRight size={16} color={colors.expense} />
                        </View>
                        <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">Expense</Text>
                        <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            $1.3K
                        </Text>
                    </GlassCard>
                    <GlassCard className="flex-1 items-center py-3 px-2">
                        <View className="w-8 h-8 rounded-full bg-blue-500/20 items-center justify-center mb-2">
                            <Target size={16} color={colors.info} />
                        </View>
                        <Text className="text-[10px] font-bold text-gray-400 uppercase mb-1">Save Rate</Text>
                        <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            25%
                        </Text>
                    </GlassCard>
                </View>

                {/* Spending Insights Chart */}
                <View>
                    <GlassCard className="mt-4 pb-0">
                        <View className="flex-row items-center mb-6">
                            <Zap size={16} color="#fbbf24" fill="#fbbf24" />
                            <Text className="text-white font-bold text-base ml-2">Spending Insights</Text>
                        </View>
                        <BarChart
                            data={barData}
                            barWidth={32}
                            spacing={14}
                            roundedTop
                            roundedBottom
                            hideRules
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisTextStyle={{ color: 'gray' }}
                            noOfSections={3}
                            maxValue={2000}
                            isAnimated
                            showGradient
                            xAxisLabelTextStyle={{ color: 'gray', fontSize: 10, fontWeight: 'bold' }}
                        />
                    </GlassCard>
                </View>

                {/* Category Limits */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">Category Limits</Text>
                        <Text className="text-gray-500 text-xs">Sorted by Usage</Text>
                    </View>

                    {categoryLimits.map((cat, index) => {
                        const percentage = Math.round((cat.spent / cat.limit) * 100);
                        return (
                            <View key={index} className="mb-5">
                                <View className="flex-row justify-between items-center mb-2">
                                    <View className="flex-row items-center">
                                        <Text className="text-white font-bold text-sm">{cat.name}</Text>
                                        <View className="w-4 h-4 rounded-full border border-red-500/50 items-center justify-center ml-2">
                                            <Text className="text-red-500 text-[10px]">!</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-end">
                                        <Text className={`font-bold text-xs mr-2 ${percentage > 100 ? 'text-red-500' : 'text-orange-500'}`}>{percentage}%</Text>
                                        <Text className={`font-bold text-sm ${percentage > 100 ? 'text-red-500' : 'text-orange-500'}`}>${cat.spent.toFixed(2)}</Text>
                                        <Text className="text-gray-600 text-xs ml-1">/ ${cat.limit.toFixed(2)}</Text>
                                    </View>
                                </View>
                                <ProgressBar
                                    progress={cat.spent / cat.limit}
                                    color={cat.color}
                                    height={6}
                                    trackColor="rgba(255,255,255,0.05)"
                                />
                            </View>
                        );
                    })}
                </View>

                {/* Financial Pulse */}
                <View>
                    <GlassCard className="mt-4 mb-4">
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center">
                                <TrendingUp size={20} color={colors.primary} />
                                <Text className="text-white font-bold text-lg ml-2">Financial Pulse</Text>
                            </View>
                            <View className="bg-white/10 px-3 py-1 rounded-lg">
                                <Text className="text-indigo-300 text-xs font-bold">December Snapshot</Text>
                            </View>
                        </View>

                        {/* Pulse Items */}
                        <View className="gap-6">
                            {/* Rollover */}
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-blue-500/10 items-center justify-center mr-3">
                                    <ArrowUpRight size={20} color="#3b82f6" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-bold">Rollover (Start)</Text>
                                    <Text className="text-gray-500 text-xs">From last month</Text>
                                </View>
                                <Text className="text-white font-bold text-lg">+$0.00</Text>
                            </View>

                            {/* Income */}
                            <View>
                                <View className="flex-row items-center mb-2">
                                    <View className="w-10 h-10 rounded-full bg-emerald-500/10 items-center justify-center mr-3">
                                        <ArrowDownRight size={20} color={colors.success} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold">Income</Text>
                                        <Text className="text-gray-500 text-xs">Total Earnings</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-emerald-500 font-bold text-lg">+$4,400.00</Text>
                                        <Text className="text-gray-600 text-xs">of $4,400.00</Text>
                                    </View>
                                </View>
                                <ProgressBar progress={1} color={colors.success} height={4} />
                            </View>

                            {/* Expenses */}
                            <View>
                                <View className="flex-row items-center mb-2">
                                    <View className="w-10 h-10 rounded-full bg-rose-500/10 items-center justify-center mr-3">
                                        <ArrowUpRight size={20} color={colors.expense} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold">Expenses</Text>
                                        <Text className="text-gray-500 text-xs">Variable Spending</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-rose-500 font-bold text-lg">-$1,250.00</Text>
                                        <Text className="text-gray-600 text-xs">of $1,280.00</Text>
                                    </View>
                                </View>
                                <ProgressBar progress={0.9} color={colors.expense} height={4} />
                            </View>

                            {/* Bills */}
                            <View>
                                <View className="flex-row items-center mb-2">
                                    <View className="w-10 h-10 rounded-full bg-orange-500/10 items-center justify-center mr-3">
                                        <Zap size={20} color={colors.warning} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-white font-bold">Bills Paid</Text>
                                        <Text className="text-gray-500 text-xs">2/7 settled</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-white font-bold text-lg">-$1,600.00</Text>
                                        <Text className="text-gray-600 text-xs">of $1,980.00</Text>
                                    </View>
                                </View>
                                <ProgressBar progress={0.8} color={colors.warning} height={4} />
                            </View>
                        </View>
                    </GlassCard>
                </View>

                {/* Net Cash Flow */}
                <View className="flex-row justify-between items-center mb-8 px-2">
                    <View>
                        <Text className="text-white font-black text-sm uppercase">Net Cash Flow</Text>
                        <Text className="text-gray-500 text-xs">Remaining Unallocated</Text>
                    </View>
                    <Text className="text-rose-500 font-black text-xl">$-1,797.00</Text>
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

export default DashboardScreen;
