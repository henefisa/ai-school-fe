export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string;
          country: string;
          created_at: string;
          id: string;
          is_primary: boolean;
          name: string;
          profile_id: string;
          state: string;
          street: string;
          type: Database['public']['Enums']['address_type'];
          zip_code: string;
        };
        Insert: {
          city?: string;
          country?: string;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          name?: string;
          profile_id: string;
          state?: string;
          street?: string;
          type?: Database['public']['Enums']['address_type'];
          zip_code?: string;
        };
        Update: {
          city?: string;
          country?: string;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          name?: string;
          profile_id?: string;
          state?: string;
          street?: string;
          type?: Database['public']['Enums']['address_type'];
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      parents: {
        Row: {
          contact_number_1: string | null;
          contact_number_2: string | null;
          created_at: string;
          id: string;
          occupation: string;
          profile_id: string | null;
        };
        Insert: {
          contact_number_1?: string | null;
          contact_number_2?: string | null;
          created_at?: string;
          id?: string;
          occupation?: string;
          profile_id?: string | null;
        };
        Update: {
          contact_number_1?: string | null;
          contact_number_2?: string | null;
          created_at?: string;
          id?: string;
          occupation?: string;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'parents_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          bio: string;
          dob: string | null;
          email: string;
          first_name: string;
          gender: Database['public']['Enums']['gender'];
          id: string;
          last_name: string;
          phone: string;
        };
        Insert: {
          avatar_url?: string;
          bio?: string;
          dob?: string | null;
          email?: string;
          first_name?: string;
          gender?: Database['public']['Enums']['gender'];
          id?: string;
          last_name?: string;
          phone?: string;
        };
        Update: {
          avatar_url?: string;
          bio?: string;
          dob?: string | null;
          email?: string;
          first_name?: string;
          gender?: Database['public']['Enums']['gender'];
          id?: string;
          last_name?: string;
          phone?: string;
        };
        Relationships: [];
      };
      student_parents: {
        Row: {
          created_at: string;
          parent_id: string;
          student_id: string;
        };
        Insert: {
          created_at?: string;
          parent_id: string;
          student_id: string;
        };
        Update: {
          created_at?: string;
          parent_id?: string;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'student_parents_parent_id_fkey';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'parents';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'student_parents_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          }
        ];
      };
      students: {
        Row: {
          address_id: string | null;
          created_at: string;
          enrollment_date: string | null;
          gpa: number | null;
          grade: string;
          id: string;
          profile_id: string;
          status: boolean;
        };
        Insert: {
          address_id?: string | null;
          created_at?: string;
          enrollment_date?: string | null;
          gpa?: number | null;
          grade?: string;
          id?: string;
          profile_id: string;
          status?: boolean;
        };
        Update: {
          address_id?: string | null;
          created_at?: string;
          enrollment_date?: string | null;
          gpa?: number | null;
          grade?: string;
          id?: string;
          profile_id?: string;
          status?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'students_address_id_fkey';
            columns: ['address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'students_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      address_type: 'HOME' | 'WORK' | 'OTHER';
      app_role: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT' | 'STAFF';
      gender: 'MALE' | 'FEMALE' | 'OTHER';
      relationship_to_student: 'MOTHER' | 'FATHER' | 'OTHER';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
