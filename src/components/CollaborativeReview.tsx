import React, { useState } from 'react';
import { Users, MessageSquare, Share2, Eye, Edit3, Clock } from 'lucide-react';

interface CollaborativeReviewProps {
  documentId: string;
  language: 'en' | 'hi';
}

interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  section: string;
  resolved: boolean;
}

export const CollaborativeReview: React.FC<CollaborativeReviewProps> = ({ documentId, language }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Legal Expert',
      content: 'This security deposit clause seems excessive. Consider negotiating it down.',
      timestamp: new Date(Date.now() - 3600000),
      section: 'Security Deposit',
      resolved: false
    },
    {
      id: '2',
      user: 'Family Member',
      content: 'The maintenance responsibilities look unfair to me.',
      timestamp: new Date(Date.now() - 7200000),
      section: 'Maintenance',
      resolved: true
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const text = {
    en: {
      title: 'Collaborative Review',
      subtitle: 'Get feedback from family, friends, or legal experts',
      shareDocument: 'Share Document',
      addComment: 'Add Comment',
      comments: 'Comments',
      resolved: 'Resolved',
      pending: 'Pending',
      section: 'Section',
      writeComment: 'Write a comment...',
      post: 'Post',
      viewers: 'Viewers',
      editors: 'Editors'
    },
    hi: {
      title: 'सहयोगी समीक्षा',
      subtitle: 'परिवार, दोस्तों या कानूनी विशेषज्ञों से फीडबैक प्राप्त करें',
      shareDocument: 'दस्तावेज़ साझा करें',
      addComment: 'टिप्पणी जोड़ें',
      comments: 'टिप्पणियां',
      resolved: 'हल हो गया',
      pending: 'लंबित',
      section: 'अनुभाग',
      writeComment: 'एक टिप्पणी लिखें...',
      post: 'पोस्ट',
      viewers: 'दर्शक',
      editors: 'संपादक'
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() && selectedSection) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        content: newComment,
        timestamp: new Date(),
        section: selectedSection,
        resolved: false
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setSelectedSection('');
    }
  };

  const toggleResolved = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, resolved: !comment.resolved }
        : comment
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span>{text[language].title}</span>
            </h3>
            <p className="text-slate-600 mt-1">{text[language].subtitle}</p>
          </div>
          
          <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>{text[language].shareDocument}</span>
          </button>
        </div>

        {/* Collaboration Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-blue-700">{text[language].viewers}</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 text-center">
            <Edit3 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">2</div>
            <div className="text-sm text-emerald-700">{text[language].editors}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{comments.length}</div>
            <div className="text-sm text-purple-700">{text[language].comments}</div>
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-slate-800 mb-3">{text[language].addComment}</h4>
          <div className="space-y-3">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{text[language].section}...</option>
              <option value="Security Deposit">Security Deposit</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Termination">Termination</option>
              <option value="Rent Payment">Rent Payment</option>
            </select>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={text[language].writeComment}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || !selectedSection}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {text[language].post}
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800">{text[language].comments}</h4>
            <div className="flex space-x-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                {comments.filter(c => c.resolved).length} {text[language].resolved}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                {comments.filter(c => !c.resolved).length} {text[language].pending}
              </span>
            </div>
          </div>

          {comments.map(comment => (
            <div
              key={comment.id}
              className={`border rounded-lg p-4 transition-all ${
                comment.resolved ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {comment.user[0]}
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{comment.user}</div>
                    <div className="text-xs text-slate-500 flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(comment.timestamp)}</span>
                      <span>•</span>
                      <span>{comment.section}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleResolved(comment.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    comment.resolved
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  {comment.resolved ? text[language].resolved : text[language].pending}
                </button>
              </div>
              
              <p className="text-slate-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};