import _ from 'lodash-es';

angular.module('portainer.app').controller('TagSelectorController', function() {
  this.$onInit = function() {
    this.state.selectedTags = _.map(this.model, (id) => _.find(this.tags, (t) => t.Id === id));
  };

  this.$onChanges = function({ model }) {
    if (model && model.currentValue) {
      this.state.selectedTags = model.currentValue.map((id) => this.tags.find((t) => t.Id === id));
    }
  };

  this.state = {
    selectedValue: '',
    selectedTags: [],
    noResult: false,
  };

  this.selectTag = function($item) {
    this.state.selectedValue = '';
    if ($item.create && this.allowCreate) {
      this.onCreate($item.value)
      return;
    }
    this.onChange(this.model.concat($item.Id));
  };

  this.removeTag = function removeTag(tag) {
    _.remove(this.state.selectedTags, { Id: tag.Id });
    _.remove(this.model, (id) => id === tag.Id);
  };

  this.getCurrentTags = function getCurrentTags(searchValue) {
    const exactTag = this.tags.find(tag => tag.Name === searchValue);
    const tags = this.tags.filter(tag => !this.model.includes(tag.Id) && tag.Name.toLowerCase().includes(searchValue));
    if (exactTag || !searchValue) {
      return tags.slice(0,7);
    }
    return tags.slice(0,6).concat({ Name: `Add "${searchValue}"` , create: true, value: searchValue});
  };
});
