import React from "react";
import { Link as LinkIcon, FileText, Loader2 } from "lucide-react";

export default function WorkUpdate({ workUpdate = [], loading }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  if (!workUpdate || workUpdate.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No work updates available.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workUpdate?.map((item) => (
        <div
          key={item.id}
          className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500">
                Posted by {item.author.first_name} {item.author.last_name} •{" "}
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 text-gray-700 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Attachment OR Link */}
          {(item.attachment || item.link) && (
            <div className="mt-4">
              {item.attachment && (
                <a
                  href={item.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View Attachment
                </a>
              )}

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 text-sm hover:underline mt-2 block"
                >
                  <LinkIcon className="w-4 h-4" />
                  Open Link
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
