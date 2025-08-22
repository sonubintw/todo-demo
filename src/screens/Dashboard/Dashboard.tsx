import React, { useEffect, useCallback, useState, Fragment } from 'react';
import {
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Chip, Divider, FAB, Surface } from 'react-native-paper';
import {
  setFilter,
  setSortBy
} from '../../redux/slice/todoSlice';
import { colors } from '../../themes/colors';
import { useDashboard } from './useDashboard';
import CountTile from '../../components/CountTile/CountTile';
import { dashboardStyles } from './dashboardStyles';
import Loader from '../../components/Loader/Loader';
import TodoCard from '../../components/TodoCard/TodoCard';
import EditDialog from '../../components/EditDialog/EditDialog';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../global/globalStyles';
import { nomenclature } from '../../constants/nomenclature';
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";





const Dashboard = () => {


  // Custom hook to manage dashboard logic
  const {
    todos,
    filterBy,
    sortBy,
    status,
    selectedTodo,
    navigation,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    dispatch,
    visibleDialog,
    setVisibleDialog,
    countLabelWithValues,
    sortOptions,
    filters
  } = useDashboard();

  //filter chips logic
  const renderFilterChips = () => {

    return (
      <View style={dashboardStyles.chipContainer}>
        <Text style={dashboardStyles.chipLabel}>{nomenclature.FILTER}</Text>
        <View style={dashboardStyles.chips}>
          {filters.map(filter => (
            <Chip
              key={filter.value}
              icon={() =>
                filterBy == filter.value && (
                  <FontAwesome6
                    name="circle-check"
                    iconStyle="solid"
                    color={colors.accent}
                    size={24} />
                )
              }
              selected={filterBy === filter.value}
              onPress={() => dispatch(setFilter(filter.value as any))}
              style={[
                dashboardStyles.chip,
                filterBy === filter.value && dashboardStyles.selectedChip,
              ]}
              textStyle={
                filterBy === filter.value
                  ? dashboardStyles.selectedChipText
                  : dashboardStyles.chipText
              }>
              {filter.label}
            </Chip>
          ))}
        </View>
      </View>
    );
  };

  // Render sort chips
  const renderSortChips = () => {

    return (
      <View style={dashboardStyles.chipContainer}>
        <Text style={dashboardStyles.chipLabel}>{nomenclature.SORT}</Text>
        <View style={dashboardStyles.chips}>
          {sortOptions.map(option => (
            <Chip
              key={option.value}
              icon={() =>
                sortBy == option.value && (
                  <FontAwesome6
                    name="circle-check"
                    iconStyle="solid"
                    color={colors.accent}
                    size={24} />
                )
              }
              selected={sortBy === option.value}
              onPress={() => dispatch(setSortBy(option.value as any))}
              style={[
                dashboardStyles.chip,
                sortBy === option.value && dashboardStyles.selectedChip,
              ]}
              textStyle={
                sortBy === option.value
                  ? dashboardStyles.selectedChipText
                  : dashboardStyles.chipText
              }>
              {option.label}
            </Chip>
          ))}
        </View>
      </View>
    );
  };



  const renderStats = () => (
    <View style={dashboardStyles.headerView}>
      {countLabelWithValues.map(item => (
        <CountTile
          title={item.title}
          count={item.value}
          key={item.id.toString()}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.rootContainer}>
      <Surface style={dashboardStyles.controlsContainer}>
        {renderFilterChips()}
        <Divider style={dashboardStyles.divider} />
        {renderSortChips()}
        <Divider style={dashboardStyles.divider} />
        {renderStats()}
      </Surface>

      {status === 'loading' ? (
        <Loader />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoCard
              item={item}
              onDelete={() => handleDeleteTodo(item.id)}
              onEdit={() => handleEditTodo(item.id, item.title)}
              onToggle={() => handleToggleTodo(item.id, item.completed)}
            />
          )}
          showsVerticalScrollIndicator={false}
          //optimization
          windowSize={5}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
        />
      )}

      {selectedTodo && (
        <EditDialog
          visible={visibleDialog}
          onDismiss={() => setVisibleDialog(false)}
          todoId={selectedTodo.id}
          initialTitle={selectedTodo.title}
        />
      )}
      <TouchableOpacity
        style={dashboardStyles.addBtn}
        onPress={() => navigation.navigate(nomenclature.TODO_SCREEN)}
      >
        <FontAwesome6 name="plus" color={colors.success} size={24} iconStyle="solid" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

