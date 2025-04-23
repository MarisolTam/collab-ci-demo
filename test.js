describe('Bookmark Tagging', () => {
    test('Should parse tags from input', () => {
      const input = 'work, project, urgent';
      const result = input.split(',').map(tag => tag.trim());
      expect(result).toEqual(['work', 'project', 'urgent']);
    });
  });
  